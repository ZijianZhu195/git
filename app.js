const flights = {
  MU2881: { route: "南京 NKG → 北京大兴 PKX", routeEn: "Nanjing NKG → Beijing Daxing PKX", time: "18:25", gate: "32", boarding: "17:45", minutes: 8, distance: 560 },
  CA1818: { route: "南京 NKG → 北京首都 PEK", routeEn: "Nanjing NKG → Beijing Capital PEK", time: "19:10", gate: "18", boarding: "18:30", minutes: 12, distance: 780 },
  ZH9842: { route: "南京 NKG → 深圳 SZX", routeEn: "Nanjing NKG → Shenzhen SZX", time: "20:05", gate: "25", boarding: "19:25", minutes: 6, distance: 390 }
};

const realDestinations = {
  airport: { name: "南京禄口国际机场T2航站楼", position: "118.862025,31.742042", mode: "car" },
  metro: { name: "禄口机场地铁站", position: "118.864308,31.735984", mode: "walk" }
};

const indoorGraph = {
  A: { x: 360, y: 326, links: ["B"] },
  B: { x: 360, y: 274, links: ["A", "C", "I"] },
  C: { x: 360, y: 218, links: ["B", "D", "G", "J"] },
  D: { x: 470, y: 168, links: ["C", "E", "H"] },
  E: { x: 570, y: 142, links: ["D", "F"] },
  F: { x: 655, y: 142, links: ["E"] },
  G: { x: 250, y: 168, links: ["C", "H"] },
  H: { x: 145, y: 142, links: ["G", "D"] },
  I: { x: 250, y: 278, links: ["B", "J"] },
  J: { x: 470, y: 278, links: ["I", "C"] },
  K: { x: 360, y: 360, links: ["A", "L"] },
  L: { x: 520, y: 360, links: ["K"] }
};

const indoorDestinations = {
  "Gate 32": { node: "F", floor: "3F" },
  "Gate 18": { node: "H", floor: "3F" },
  "Gate 25": { node: "E", floor: "3F" },
  "禄口机场地铁站": { node: "L", floor: "B1" },
  "中免免税": { node: "H", floor: "3F" },
  "金陵名小吃": { node: "F", floor: "3F" },
  "M Stand": { node: "J", floor: "3F" },
  "罗森便利店": { node: "I", floor: "2F" },
  "云锦·南京": { node: "G", floor: "3F" },
  "SEPHORA 丝芙兰": { node: "H", floor: "3F" },
  "金陵好礼": { node: "E", floor: "3F" },
  "南京大牌档": { node: "I", floor: "3F" },
  "茶颜悦色": { node: "G", floor: "3F" },
  "先锋书店": { node: "E", floor: "3F" },
  "苏味集": { node: "F", floor: "3F" }
};

const floorVisuals = {
  "3F": {
    terminal: "M48 112H245L288 176Q360 205 432 176L475 112H672V174H492L452 222Q360 258 268 222L228 174H48Z",
    concourse: "M260 205Q360 250 460 205L492 310Q360 374 228 310Z",
    network: ["M55 142H245L360 218L475 142H665", "M360 218V326", "M250 168H470", "M250 278H470", "M145 142H570"],
    places: [["360 206", "安检 Security"], ["360 305", "值机 Check-in"], ["520 130", "登机口 Gates"]],
    zones: ["1-8 / 81-84", "15-31 / 41-46"]
  },
  "2F": {
    terminal: "M72 104H648V158H470L430 204H290L250 158H72Z",
    concourse: "M160 235H560V282L495 330H225L160 282Z",
    network: ["M82 132H638", "M250 132L320 258", "M470 132L400 258", "M225 278H495", "M360 132V326"],
    places: [["180 124", "到达廊桥 Arrivals"], ["360 270", "行李提取 Baggage"], ["510 270", "到达出口 Exit"]],
    zones: ["2F 到达长廊", "1F 到达大厅"]
  },
  "B1": {
    terminal: "M62 116L238 80L315 112H405L482 80L658 116L610 184H110Z",
    concourse: "M220 210H500V326H220Z",
    network: ["M85 148H635", "M180 148V270H540V148", "M360 112V350", "M250 268H470", "M360 326H520"],
    places: [["360 315", "地铁 S1 Metro"], ["250 250", "交通中心 Transport"], ["535 132", "停车场 P1/P2"]],
    zones: ["T2 / 交通中心 / T1", "B1 地铁换乘"]
  }
};

const shopReviews = {
  default: [
    { user: "航旅用户 2281", stars: 5, text: "位置很好找，服务速度快，赶飞机时也不用排很久。" },
    { user: "南京出发", stars: 5, text: "商品选择丰富，店员介绍很清楚，整体体验不错。" },
    { user: "云端旅客", stars: 4, text: "距离登机口不远，价格和机场内其他门店差不多。" }
  ],
  "金陵名小吃": [
    { user: "一碗热汤", stars: 5, text: "出发前吃一碗鸭血粉丝汤很满足，出餐快，距离登机口也近。" },
    { user: "苏A旅行者", stars: 5, text: "盐水鸭味道很南京，打包带上飞机也方便。" },
    { user: "早班机乘客", stars: 4, text: "早上营业很及时，汤很热，座位稍微少了一些。" }
  ]
};

const merchants = [
  { name: "禄口机场地铁站", nameEn: "Lukou Airport Metro Station", category: "transit", symbol: "M", location: "T2 · B1 · 交通中心", locationEn: "T2 · B1 · Transport Center", product: "地铁 S1 号线 · 往南京南站", productEn: "Metro Line S1 · To Nanjing South", rating: "首班 06:00", reviews: 0, discount: "约 6 分钟到达", discountEn: "6 min walk", isMetro: true },
  { name: "中免免税", nameEn: "CDF Duty Free", category: "dutyfree", symbol: "免", location: "T2 · 3F · 国际出发", locationEn: "T2 · 3F · International Departures", product: "国际香化 · 酒水精品", productEn: "Beauty · Wine & Spirits", rating: "4.8", reviews: 428, discount: "精选商品 8 折", discountEn: "20% OFF selected" },
  { name: "金陵名小吃", nameEn: "Jinling Local Bites", category: "food", symbol: "味", location: "T2 · 3F · 32号门附近", locationEn: "T2 · 3F · Near Gate 32", product: "鸭血粉丝汤 · 盐水鸭", productEn: "Duck Soup · Salted Duck", rating: "4.8", reviews: 328, discount: "航旅会员 9 折", discountEn: "10% OFF" },
  { name: "M Stand", nameEn: "M Stand Coffee", category: "food", symbol: "M", location: "T2 · 3F · 国内出发", locationEn: "T2 · 3F · Domestic Departures", product: "拿铁 · 巴斯克蛋糕", productEn: "Latte · Basque Cake", rating: "4.7", reviews: 186, discount: "第二杯半价", discountEn: "2nd cup 50% OFF" },
  { name: "罗森便利店", nameEn: "Lawson Convenience", category: "convenience", symbol: "便", location: "T2 · 2F · 到达大厅", locationEn: "T2 · 2F · Arrivals", product: "即食餐饮 · 旅行用品", productEn: "Grab & Go · Travel Essentials", rating: "4.6", reviews: 152, discount: "会员价低至 8.8 折", discountEn: "Member price" },
  { name: "云锦·南京", nameEn: "Nanjing Brocade", category: "beauty", symbol: "锦", location: "T2 · 3F · 中央商业区", locationEn: "T2 · 3F · Central Retail", product: "云锦丝巾 · 真丝配饰", productEn: "Brocade Scarf · Silk Accessories", rating: "4.9", reviews: 96, discount: "满 500 减 80", discountEn: "¥80 OFF ¥500" },
  { name: "SEPHORA 丝芙兰", nameEn: "SEPHORA", category: "beauty", symbol: "妆", location: "T2 · 3F · 国际出发", locationEn: "T2 · 3F · International Departures", product: "护肤 · 彩妆 · 香水", productEn: "Skincare · Makeup · Fragrance", rating: "4.7", reviews: 218, discount: "会员双倍积分", discountEn: "2× member points" },
  { name: "金陵好礼", nameEn: "Jinling Gifts", category: "gift", symbol: "礼", location: "T2 · 3F · 28号门附近", locationEn: "T2 · 3F · Near Gate 28", product: "南京特产 · 精选伴手礼", productEn: "Nanjing Specialties · Gifts", rating: "4.8", reviews: 274, discount: "满 200 包邮", discountEn: "Free shipping over ¥200" },
  { name: "南京大牌档", nameEn: "Nanjing Impressions", category: "food", symbol: "宁", location: "T2 · 3F · 休闲餐饮区", locationEn: "T2 · 3F · Dining Area", product: "美龄粥 · 桂花拉糕", productEn: "Meiling Porridge · Osmanthus Cake", rating: "4.6", reviews: 512, discount: "套餐立减 20 元", discountEn: "¥20 OFF set meal" },
  { name: "茶颜悦色", nameEn: "Modern China Tea", category: "food", symbol: "茶", location: "T2 · 3F · 20号门附近", locationEn: "T2 · 3F · Near Gate 20", product: "幽兰拿铁 · 声声乌龙", productEn: "Tea Latte · Oolong Tea", rating: "4.7", reviews: 641, discount: "会员积分双倍", discountEn: "2× member points" },
  { name: "先锋书店", nameEn: "Librairie Avant-Garde", category: "book", symbol: "书", location: "T2 · 3F · 25号门附近", locationEn: "T2 · 3F · Near Gate 25", product: "旅行读物 · 文创专柜", productEn: "Books · Creative Gifts", rating: "4.9", reviews: 189, discount: "文创商品 9 折", discountEn: "10% OFF gifts" },
  { name: "苏味集", nameEn: "Jiangsu Flavours", category: "gift", symbol: "苏", location: "T2 · 3F · 36号门附近", locationEn: "T2 · 3F · Near Gate 36", product: "苏式糕点 · 碧螺春", productEn: "Jiangsu Pastry · Biluochun Tea", rating: "4.8", reviews: 207, discount: "第二件 7 折", discountEn: "30% OFF 2nd item" }
];

const copy = {
  zh: {
    brand: "禄口畅行", navGuide: "机场导航", navShops: "机场周边", navServices: "出行服务", eyebrow: "南京禄口国际机场 · T2",
    heroLine1: "从这里，", heroLine2: "从容抵达每一程。", heroDesc: "输入航班号，即刻查看航班动态与登机口路线。机场再大，也不绕路。",
    flightLabel: "输入航班号", startNav: "开始导航", recent: "最近查询", indoorMap: "T2 室内导航演示", minutes: "分钟", toGate: "步行至 32 号登机口",
    passSecurity: "途经国内安检", boardingSoon: "即将登机", departureTime: "计划起飞", gate: "登机口", boardingTime: "登机时间", changeFlight: "更换航班",
    airportSelect: "AROUND NKG · 机场周边", shopsTitle: "从地铁到好店，一搜即达。", catAll: "全部", catDutyfree: "免税店", catFood: "餐饮奶茶", catConvenience: "便利店", catBeauty: "服饰美妆", catGift: "特产礼品", catBook: "书店专柜",
    noResult: "没有找到相关店铺", tryAgain: "换个关键词试试", servicesTitle: "把琐事交给我们，轻装启程。", svcLuggage: "行李寄存", svcCharge: "充电设施", svcMother: "母婴室",
    realNav: "真实地图导航", realNavHint: "使用手机当前位置，由高德地图规划路线", navAirport: "导航至禄口机场", navMetro: "导航至机场地铁站",
    footerText: "高德地图提供机场外真实路线；登机口与店铺室内路线为引导示意。"
  },
  en: {
    brand: "NKG EasyGo", navGuide: "Navigation", navShops: "Airport Shops", navServices: "Services", eyebrow: "Nanjing Lukou International Airport · T2",
    heroLine1: "Right here,", heroLine2: "every journey feels easy.", heroDesc: "Enter your flight number for live flight details and a direct route to your gate.",
    flightLabel: "FLIGHT NUMBER", startNav: "Navigate", recent: "Recent", indoorMap: "Indoor map", minutes: "min", toGate: "Walk to Gate 32",
    passSecurity: "via Domestic Security", boardingSoon: "BOARDING SOON", departureTime: "Departure", gate: "Gate", boardingTime: "Boarding", changeFlight: "Change flight",
    airportSelect: "AROUND NKG", shopsTitle: "From metro to shops, search and go.", catAll: "All", catDutyfree: "Duty Free", catFood: "Food & Tea", catConvenience: "Convenience", catBeauty: "Fashion & Beauty", catGift: "Local Gifts", catBook: "Books",
    noResult: "No shops found", tryAgain: "Try another keyword", servicesTitle: "Leave the little things to us.", svcLuggage: "Luggage Storage", svcCharge: "Charging", svcMother: "Nursery",
    realNav: "Real map navigation", realNavHint: "Plan from your live location with Amap", navAirport: "Navigate to airport", navMetro: "Navigate to metro",
    footerText: "Amap provides real routes outside the airport. Indoor gate and shop routes are guidance only."
  }
};

let language = "zh";
let activeCategory = "all";
let activeFlight = "MU2881";
let activeRealDestination = "airport";
let currentIndoorNode = "A";
let activeIndoorRoute = [];
let indoorNavigationTimer = null;
let selectedReviewStars = 5;
let activeReviewShop = "";

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];

function nodeDistance(from, to) {
  return Math.hypot(indoorGraph[from].x - indoorGraph[to].x, indoorGraph[from].y - indoorGraph[to].y);
}

function shortestIndoorPath(start, end) {
  const distances = Object.fromEntries(Object.keys(indoorGraph).map((node) => [node, Infinity]));
  const previous = {};
  const unvisited = new Set(Object.keys(indoorGraph));
  distances[start] = 0;
  while (unvisited.size) {
    const current = [...unvisited].reduce((best, node) => distances[node] < distances[best] ? node : best);
    unvisited.delete(current);
    if (current === end || distances[current] === Infinity) break;
    indoorGraph[current].links.forEach((neighbor) => {
      const nextDistance = distances[current] + nodeDistance(current, neighbor);
      if (nextDistance < distances[neighbor]) {
        distances[neighbor] = nextDistance;
        previous[neighbor] = current;
      }
    });
  }
  const route = [];
  let cursor = end;
  while (cursor) {
    route.unshift(cursor);
    if (cursor === start) break;
    cursor = previous[cursor];
  }
  return route[0] === start ? route : [start];
}

function switchFloor(floor) {
  $$(".floor-switch button").forEach((button) => button.classList.toggle("active", button.dataset.floor === floor));
  $("#currentFloorLabel").textContent = `T2 · ${floor}`;
  const visual = floorVisuals[floor];
  $("#terminalShape").setAttribute("d", visual.terminal);
  $("#concourseShape").setAttribute("d", visual.concourse);
  $("#mapNetwork").innerHTML = visual.network.map((path) => `<path d="${path}"></path>`).join("");
  visual.places.forEach((place, index) => {
    $(`#mapPlace${index + 1}`).setAttribute("transform", `translate(${place[0]})`);
    $(`#mapPlaceText${index + 1}`).textContent = place[1];
  });
  $("#zoneLabel1").textContent = visual.zones[0];
  $("#zoneLabel2").textContent = visual.zones[1];
}

function planIndoorRoute(destinationName, detail) {
  stopIndoorNavigation();
  const destination = indoorDestinations[destinationName] || { node: "E", floor: "3F" };
  activeIndoorRoute = shortestIndoorPath(currentIndoorNode, destination.node);
  const points = activeIndoorRoute.map((node) => indoorGraph[node]);
  $("#routePath").setAttribute("d", points.map((point, index) => `${index ? "L" : "M"}${point.x} ${point.y}`).join(" "));
  const end = indoorGraph[destination.node];
  $("#destinationPin").setAttribute("transform", `translate(${end.x} ${end.y})`);
  $("#destinationLabel").setAttribute("transform", `translate(${Math.max(20, end.x - 52)} ${Math.max(30, end.y - 55)})`);
  $(".gate-label text").textContent = destinationName.replace("禄口机场", "");
  const distance = Math.max(20, Math.round(activeIndoorRoute.slice(1).reduce((sum, node, index) => sum + nodeDistance(activeIndoorRoute[index], node), 0) * 2.4 / 10) * 10);
  const minutes = Math.max(1, Math.ceil(distance / 75));
  $(".route-time strong").textContent = minutes;
  $(".route-card > div:nth-child(2) > span").textContent = language === "zh" ? `步行至 ${destinationName}` : `Walk to ${destinationName}`;
  $(".route-card small b").textContent = `${distance} m`;
  $(".route-card small span").textContent = detail || (destination.floor === "3F" ? "虚拟路网已规划" : `乘电梯前往 ${destination.floor}`);
  $("#startIndoorNavigation").textContent = "▶";
  $("#instructionTitle").textContent = "路线规划完成";
  $("#instructionDetail").textContent = `共经过 ${Math.max(0, activeIndoorRoute.length - 1)} 个导航节点`;
  $("#turnInstruction").classList.add("show");
  switchFloor(destination.floor);
}

function stopIndoorNavigation() {
  clearInterval(indoorNavigationTimer);
  indoorNavigationTimer = null;
  $("#terminalMap").classList.remove("navigating");
  if ($("#startIndoorNavigation")) $("#startIndoorNavigation").textContent = "▶";
}

function startIndoorNavigation() {
  if (indoorNavigationTimer) {
    stopIndoorNavigation();
    return;
  }
  if (activeIndoorRoute.length < 2) {
    showToast(language === "zh" ? "您已到达目的地" : "You have arrived");
    return;
  }
  let step = 0;
  $("#terminalMap").classList.add("navigating");
  $("#startIndoorNavigation").textContent = "Ⅱ";
  $("#positionMode").textContent = language === "zh" ? "BLE + Wi-Fi 定位跟随中" : "BLE + Wi-Fi tracking";
  indoorNavigationTimer = setInterval(() => {
    step += 1;
    const node = activeIndoorRoute[step];
    const point = indoorGraph[node];
    currentIndoorNode = node;
    $("#youPin").setAttribute("transform", `translate(${point.x} ${point.y})`);
    const remainingNodes = activeIndoorRoute.slice(step);
    const remaining = Math.round(remainingNodes.slice(1).reduce((sum, item, index) => sum + nodeDistance(remainingNodes[index], item), 0) * 2.4 / 10) * 10;
    $(".route-card small b").textContent = `${remaining} m`;
    $("#positionAccuracy").textContent = `定位精度约 ±${(2.6 + Math.random() * 1.8).toFixed(1)}m`;
    $("#turnIcon").textContent = step % 3 === 0 ? "↱" : "↑";
    $("#instructionTitle").textContent = remaining ? (step % 3 === 0 ? "前方路口右转" : "沿当前通道直行") : "您已到达目的地";
    $("#instructionDetail").textContent = remaining ? `继续前行 ${remaining} 米` : "室内导航已结束";
    if (step >= activeIndoorRoute.length - 1) {
      stopIndoorNavigation();
      $(".route-time strong").textContent = "0";
      showToast(language === "zh" ? "已到达目的地" : "Destination reached");
    }
  }, 1100);
}

function renderMerchants() {
  const query = $("#shopSearch").value.trim().toLowerCase();
  const list = merchants.filter((m) => {
    const matchCategory = activeCategory === "all" || m.category === activeCategory;
    const haystack = `${m.name} ${m.nameEn} ${m.product} ${m.productEn}`.toLowerCase();
    return matchCategory && haystack.includes(query);
  });

  $("#merchantGrid").innerHTML = list.map((m) => `
    <article class="merchant-card">
      <div class="merchant-visual ${m.category}">
        <span class="discount-tag">${language === "zh" ? m.discount : m.discountEn}</span>
        <span class="product-symbol">${m.symbol}</span>
      </div>
      <div class="merchant-body">
        <div class="merchant-meta"><span>${language === "zh" ? m.location : m.locationEn}</span><span class="rating">${m.isMetro ? "● " + m.rating : "★ " + m.rating + " (" + m.reviews + ")"}</span></div>
        <h3>${language === "zh" ? m.name : m.nameEn}</h3>
        <p>${language === "zh" ? m.product : m.productEn}</p>
        <div class="merchant-actions">
          <button data-nav-shop="${m.name}">${language === "zh" ? "导航前往" : "Navigate"}</button>
          <button data-review-shop="${m.name}" ${m.isMetro ? "disabled" : ""}>${m.isMetro ? (language === "zh" ? "S1 号线" : "Line S1") : (language === "zh" ? "查看点评" : "Reviews")}</button>
        </div>
      </div>
    </article>
  `).join("");

  $("#emptyState").style.display = list.length ? "none" : "grid";
  bindMerchantActions();
}

function bindMerchantActions() {
  $$("[data-nav-shop]").forEach((button) => button.addEventListener("click", () => {
    const isMetro = button.dataset.navShop === "禄口机场地铁站";
    activeRealDestination = isMetro ? "metro" : "airport";
    showToast(language === "zh" ? `已规划前往「${button.dataset.navShop}」的路线` : `Route to ${button.dataset.navShop} ready`);
    $(".map-card").scrollIntoView({ behavior: "smooth", block: "center" });
    planIndoorRoute(button.dataset.navShop, isMetro ? "乘电梯前往 B1 · S1 号线" : "虚拟室内路网已规划");
  }));
  $$("[data-review-shop]").forEach((button) => button.addEventListener("click", () => {
    openReviews(button.dataset.reviewShop);
  }));
}

function renderReviewList(shopName) {
  const reviews = shopReviews[shopName] || shopReviews.default;
  $("#reviewList").innerHTML = reviews.map((review) => `
    <article class="review-item">
      <header><strong>${review.user}</strong><span>${"★".repeat(review.stars)}${"☆".repeat(5 - review.stars)}</span></header>
      <p>${review.text}</p>
    </article>
  `).join("");
}

function openReviews(shopName) {
  activeReviewShop = shopName;
  const merchant = merchants.find((item) => item.name === shopName);
  $("#modalShopName").textContent = language === "zh" ? merchant.name : merchant.nameEn;
  $("#modalRating").textContent = merchant.rating;
  $("#modalReviewCount").textContent = language === "zh" ? `${merchant.reviews} 条评价` : `${merchant.reviews} reviews`;
  renderReviewList(shopName);
  $("#reviewModal").classList.add("open");
  $("#reviewModal").setAttribute("aria-hidden", "false");
}

function showToast(message) {
  const toast = $("#toast");
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(window.toastTimer);
  window.toastTimer = setTimeout(() => toast.classList.remove("show"), 2600);
}

function focusIndoorMap() {
  $(".map-card").scrollIntoView({ behavior: "smooth", block: "center" });
}

function setFlight(code) {
  const normalized = code.trim().toUpperCase();
  const flight = flights[normalized];
  if (!flight) {
    showToast(language === "zh" ? "未找到该航班，请试试 MU2881" : "Flight not found. Try MU2881");
    return;
  }
  activeFlight = normalized;
  activeRealDestination = "airport";
  $("#flightInput").value = normalized;
  $("#currentFlight").textContent = normalized;
  $("#flightRoute").textContent = language === "zh" ? flight.route : flight.routeEn;
  $("#flightTime").textContent = flight.time;
  $("#flightGate").textContent = flight.gate;
  $("#boardingTime").textContent = flight.boarding;
  planIndoorRoute(`Gate ${flight.gate}`, language === "zh" ? "途经国内安检" : "via Domestic Security");
  showToast(language === "zh" ? `${normalized} 航班路线已更新` : `${normalized} route updated`);
  $("#routePath").style.animation = "none";
  requestAnimationFrame(() => $("#routePath").style.animation = "");
}

$("#flightForm").addEventListener("submit", (event) => {
  event.preventDefault();
  setFlight($("#flightInput").value);
  focusIndoorMap();
});
$$("[data-flight]").forEach((button) => button.addEventListener("click", () => {
  setFlight(button.dataset.flight);
  focusIndoorMap();
}));
$("#changeFlight").addEventListener("click", () => { $("#flightInput").focus(); $("#navigation").scrollIntoView({ behavior: "smooth" }); });

$("#categoryRow").addEventListener("click", (event) => {
  const button = event.target.closest(".category");
  if (!button) return;
  activeCategory = button.dataset.category;
  $$(".category").forEach((item) => item.classList.toggle("active", item === button));
  renderMerchants();
});
$("#shopSearch").addEventListener("input", renderMerchants);
document.addEventListener("keydown", (event) => {
  if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
    event.preventDefault();
    $("#shopSearch").focus();
    $("#shops").scrollIntoView({ behavior: "smooth" });
  }
});

$("#languageButton").addEventListener("click", () => {
  language = language === "zh" ? "en" : "zh";
  document.documentElement.lang = language === "zh" ? "zh-CN" : "en";
  $$("[data-i18n]").forEach((node) => { node.textContent = copy[language][node.dataset.i18n]; });
  $("#shopSearch").placeholder = language === "zh" ? "搜索地铁、店铺、商品，如「盐水鸭」" : "Search metro, shops or products";
  setFlight(activeFlight);
  renderMerchants();
});

function locateUser() {
  if (!navigator.geolocation) {
    showToast(language === "zh" ? "当前设备不支持定位" : "Geolocation is not supported");
    return;
  }
  showToast(language === "zh" ? "正在获取您的位置…" : "Locating you…");
  navigator.geolocation.getCurrentPosition(
    () => showToast(language === "zh" ? "定位成功：T2 航站楼 3F 出发大厅" : "Located: T2, 3F Departure Hall"),
    () => showToast(language === "zh" ? "已使用机场室内定位：T2 · 3F" : "Using airport indoor location: T2 · 3F"),
    { timeout: 3500 }
  );
}
$("#locationButton").addEventListener("click", locateUser);
$("#recenterButton").addEventListener("click", () => {
  stopIndoorNavigation();
  currentIndoorNode = "A";
  $("#youPin").setAttribute("transform", `translate(${indoorGraph.A.x} ${indoorGraph.A.y})`);
  $("#positionMode").textContent = language === "zh" ? "BLE + Wi-Fi 模拟定位" : "BLE + Wi-Fi simulated positioning";
  $("#positionAccuracy").textContent = language === "zh" ? "定位精度约 ±3.2m" : "Accuracy approx. ±3.2m";
  setFlight(activeFlight);
  showToast(language === "zh" ? "已模拟重新定位：3F 出发大厅" : "Simulated location reset: 3F Departure Hall");
});

function openAmapNavigation(destinationKey) {
  const destination = realDestinations[destinationKey] || realDestinations.airport;
  const url = new URL("https://uri.amap.com/navigation");
  url.searchParams.set("to", `${destination.position},${destination.name}`);
  url.searchParams.set("mode", destination.mode);
  url.searchParams.set("policy", "0");
  url.searchParams.set("src", "NKG-EasyGo");
  url.searchParams.set("callnative", "1");
  showToast(language === "zh" ? `正在打开高德地图：${destination.name}` : `Opening Amap: ${destination.name}`);
  setTimeout(() => { window.location.href = url.toString(); }, 300);
}

$$("[data-amap-destination]").forEach((button) => button.addEventListener("click", () => openAmapNavigation(button.dataset.amapDestination)));
$("#startIndoorNavigation").addEventListener("click", startIndoorNavigation);
$$(".floor-switch button").forEach((button) => button.addEventListener("click", () => {
  switchFloor(button.dataset.floor);
  showToast(language === "zh" ? `正在查看 T2 · ${button.dataset.floor} 虚拟楼层` : `Viewing virtual T2 · ${button.dataset.floor}`);
}));

$("#modalClose").addEventListener("click", () => $("#reviewModal").classList.remove("open"));
$("#reviewModal").addEventListener("click", (event) => { if (event.target === $("#reviewModal")) $("#reviewModal").classList.remove("open"); });
$("#starInput").addEventListener("click", (event) => {
  const button = event.target.closest("[data-star]");
  if (!button) return;
  selectedReviewStars = Number(button.dataset.star);
  $$("#starInput button").forEach((item) => item.classList.toggle("active", Number(item.dataset.star) <= selectedReviewStars));
});
$("#reviewForm").addEventListener("submit", (event) => {
  event.preventDefault();
  const text = $("#reviewText").value.trim();
  if (!text) {
    showToast(language === "zh" ? "请先填写评价内容" : "Please write your review");
    return;
  }
  if (!shopReviews[activeReviewShop]) shopReviews[activeReviewShop] = [...shopReviews.default];
  shopReviews[activeReviewShop].unshift({ user: "网页访客", stars: selectedReviewStars, text });
  $("#reviewText").value = "";
  renderReviewList(activeReviewShop);
  showToast(language === "zh" ? "评价已发布在当前网页" : "Review posted on this webpage");
});
$$("#starInput button").forEach((item) => item.classList.toggle("active", Number(item.dataset.star) <= selectedReviewStars));

renderMerchants();
planIndoorRoute("Gate 32", "途经国内安检");
