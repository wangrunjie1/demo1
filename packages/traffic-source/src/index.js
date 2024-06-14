import jsCookie from "js-cookie"
import { generateSessionId } from "./utils"
module.exports = function () {
  // 已经记录了来源信息，不进行覆盖
  if (jsCookie.get("traffic_source")) return

  const searchEngines = [
    "baidu.com",
    "so.com",
    "sogou.com",
    "360.cn",
    "shenma.com",
    "sm.cn",
    "zhongsou.com",
    "youdao.com",
    "google.com",
    "bing.com",
    "yahoo.com",
    "duckduckgo.com",
    "ask.com",
    "aol.com",
    "excite.com",
    "lycos.com",
    "webcrawler.com",
  ]

  const query = parseQueryString(location.search)
  const referrer = document.referrer || ""

  const utmParams = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"]

  const sessionId = generateSessionId()
  const sessionData = {
    session_id: sessionId,
  }

  utmParams.forEach((item) => {
    sessionData[item] = jsCookie.get(item) || query[item] || ""
  })

  sessionData.traffic_source = jsCookie.get("traffic_source") || getTraficSource()
  sessionData.referral = jsCookie.get("referral") || referrer
  Object.keys(sessionData).forEach((item) => {
    const value = decodeURIComponent(sessionData[item])
    if (value) {
      const domain = location.hostname.split(".").slice(1).join(".")
      jsCookie.set(item, value, { domain })
    }
  })

  // traffic_source
  // SEM：如果用户访问网站带了utm参数，且utm_medium为“cpc”或“feeds”
  // Other：如果用户访问网站带了utm参数，且utm_medium不是“cpc”或“feeds”
  // SEO：如果用户访问网站不带utm参数，且HTTP referer包含以下搜索引擎域名
  // Referral：如果用户访问网站不带utm参数，且HTTP referer不为空且不包含上述域名
  // Direct：如果用户访问网站不带utm参数，且HTTP referer不包含上述搜索引擎域名
  function getTraficSource() {
    if (sessionData.utm_medium) {
      if (["cpc", "feeds"].includes(sessionData.utm_medium)) {
        return "SEM"
      }
      return "Other"
    } else if (referrer) {
      const isSearchEngine = searchEngines.some((engine) => referrer.includes(engine))
      if (isSearchEngine) {
        return "SEO"
      } else {
        return "Referral"
      }
    }
    return "Direct"
  }
  function parseQueryString(queryString) {
    if (queryString.startsWith("?")) {
      queryString = queryString.substring(1)
    }
    const params = {}
    const pairs = queryString.split("&")
    for (const pair of pairs) {
      const [key, value] = pair.split("=")
      params[decodeURIComponent(key)] = decodeURIComponent(value || "")
    }

    return params
  }
}
