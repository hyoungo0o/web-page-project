package com.study.board.controller;

import com.rometools.rome.feed.synd.SyndEntry;
import com.rometools.rome.feed.synd.SyndFeed;
import com.rometools.rome.io.SyndFeedInput;
import com.rometools.rome.io.XmlReader;

//import com.study.board.ITNewsService;
import org.apache.commons.text.StringEscapeUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.stereotype.Controller;
import org.springframework.stereotype.Service;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;

import java.io.IOException;
import java.net.URL;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.util.stream.Collectors;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.springframework.web.bind.annotation.RequestParam;


@Controller
@RequestMapping("/hlsystem")
public class ITNewsController {

//    @Autowired
//    private ITNewsService itNewsService;

    // H&L SYSTEM About
//    @GetMapping("/about/introduce")
//    public String introduce() {
//
//        return "introduce";
//    }
    @GetMapping("/about/introduce")
    public String getITNewsIntroduce(Model model) {
        try {
            // RSS 피드 읽기
            List<NewsItemDTO> allNewsItems = new ArrayList<>();

            // 클라우드 관련 뉴스 RSS 파싱 및 추가
            URL feedUrlCloud = new URL("https://www.google.com/alerts/feeds/17691376847696052296/17832612423464187367");
            SyndFeedInput inputCloud = new SyndFeedInput();
            SyndFeed feedCloud = inputCloud.build(new XmlReader(feedUrlCloud));
            allNewsItems.addAll(parseFeeds(feedCloud, feedUrlCloud));

            // IT 관련 뉴스 RSS 파싱 및 추가
            URL feedUrlIt = new URL("https://www.google.com/alerts/feeds/17691376847696052296/5262871033021610214");
            SyndFeedInput inputIt = new SyndFeedInput();
            SyndFeed feedIt = inputIt.build(new XmlReader(feedUrlIt));
            allNewsItems.addAll(parseFeeds(feedIt, feedUrlIt));

//             최신 뉴스 4개로 제한
            allNewsItems = allNewsItems.stream()
                    .sorted(Comparator.comparing(NewsItemDTO::getPubDate).reversed())
                    .limit(3)
                    .collect(Collectors.toList());

            // HTML 엔티티를 실제 문자로 변환
            for (NewsItemDTO item : allNewsItems) {
                item.setTitle(decodeHtmlEntities(item.getTitle()));
                item.setPubDate(formatPubDate(item.getPubDate())); // 날짜 포맷 변경
            }

            model.addAttribute("newsItems", allNewsItems);
        } catch (Exception e) {
            e.printStackTrace();
        }

        return "introduce";
    }

    @GetMapping("/about/ceo")
    public String ceo() {

        return "ceo";
    }
    @GetMapping("/about/history")
    public String history() {

        return "history";
    }

    @GetMapping("/about/contact")
    public String contact() {

        return "contact";
    }
    // H&L SYSTEM About 끝

    // Solutions
    @GetMapping("/solutions/solutions_xdmp")
    public String solutions_xdmp() {

        return "solutions_xdmp";
    }
    @GetMapping("/solutions/solutions_sqle")
    public String solutions_sqle() {

        return "solutions_sqle";
    }
    @GetMapping("/solutions/solutions_etc")
    public String solutions_etc() {

        return "solutions_etc";
    }

    // BUSINESS(클라이언트)
    @GetMapping("/business")
    public String business() {

        return "business";
    }


//    // IT NEWS
//    @GetMapping("/it_news")
//    public String it_news() {
//
//        return "it_news";
//    }


    // RECRUIT(채용)
    @GetMapping("/recruit/recruit_ideal_candidate")
    public String recruit_ideal_candidate() {

        return "recruit_ideal_candidate";
    }
    @GetMapping("/recruit/recruit_info")
    public String recruit_info() {

        return "recruit_info";
    }



    @GetMapping("/it_news")
    public String getITNews(Model model) {
        try {
            // RSS 피드 읽기
            List<NewsItemDTO> allNewsItems = new ArrayList<>();

            // 클라우드 관련 뉴스 RSS 파싱 및 추가
            URL feedUrlCloud = new URL("https://www.google.com/alerts/feeds/17691376847696052296/17832612423464187367");
            SyndFeedInput inputCloud = new SyndFeedInput();
            SyndFeed feedCloud = inputCloud.build(new XmlReader(feedUrlCloud));
            allNewsItems.addAll(parseFeeds(feedCloud, feedUrlCloud));

            // IT 관련 뉴스 RSS 파싱 및 추가
            URL feedUrlIt = new URL("https://www.google.com/alerts/feeds/17691376847696052296/5262871033021610214");
            SyndFeedInput inputIt = new SyndFeedInput();
            SyndFeed feedIt = inputIt.build(new XmlReader(feedUrlIt));
            allNewsItems.addAll(parseFeeds(feedIt, feedUrlIt));

            // HTML 엔티티를 실제 문자로 변환
            for (NewsItemDTO item : allNewsItems) {
                item.setTitle(decodeHtmlEntities(item.getTitle()));
                item.setPubDate(formatPubDate(item.getPubDate())); // 날짜 포맷 변경
            }

            model.addAttribute("newsItems", allNewsItems);
        } catch (Exception e) {
            e.printStackTrace();
        }

        return "it_news";
    }

    private List<NewsItemDTO> parseFeeds(SyndFeed feed, URL feedUrl) {
        List<NewsItemDTO> newsItems = new ArrayList<>();

        for (SyndEntry entry : feed.getEntries()) {
            NewsItemDTO newsItem = new NewsItemDTO();
            newsItem.setTitle(entry.getTitle());
            newsItem.setLink(entry.getLink());
            newsItem.setPubDate(entry.getPublishedDate().toString()); // RSS 피드의 날짜는 문자열로 설정됨
            newsItem.setSiteName(extractSiteName(entry.getLink()));
            newsItem.setImageUrl(extractImageUrl(entry.getLink()));

            newsItems.add(newsItem);
        }

        return newsItems;
    }

    private String formatPubDate(String pubDate) {
        try {
            SimpleDateFormat inputFormat = new SimpleDateFormat("EEE MMM dd HH:mm:ss zzz yyyy", Locale.ENGLISH);
            Date date = inputFormat.parse(pubDate);
            SimpleDateFormat outputFormat = new SimpleDateFormat("yyyy-MM-dd");
            return outputFormat.format(date);
        } catch (ParseException e) {
            e.printStackTrace();
            return pubDate;
        }
    }

    private String extractImageUrl(String articleUrl) {
        try {
            Document doc = Jsoup.connect(articleUrl).get();
            String html = doc.html();

            // 정규표현식을 이용하여 이미지 URL 추출
            Pattern pattern = Pattern.compile("<img.*?src=\"(.*?)\".*?>");
            Matcher matcher = pattern.matcher(html);

            if (matcher.find()) {
                String imgUrl = matcher.group(1);
                return imgUrl;
            }

            return null; // 이미지가 없을 경우
        } catch (IOException e) {
            e.printStackTrace();
            return null;
        }
    }

    private String extractSiteName(String link) {
        try {
            URL url = new URL(link);
            String host = url.getHost();
            return host.startsWith("www.") ? host.substring(4) : host;
        } catch (Exception e) {
            e.printStackTrace();
            return "Unknown";
        }
    }

    private String decodeHtmlEntities(String textWithEntities) {
        return StringEscapeUtils.unescapeHtml4(textWithEntities);
    }







}
