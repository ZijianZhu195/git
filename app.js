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
  A: { x: 118, y: 188, links: ["B"] },
  B: { x: 205, y: 188, links: ["A", "C", "G"] },
  C: { x: 292, y: 221, links: ["B", "D", "I"] },
  D: { x: 350, y: 264, links: ["C", "E", "K"] },
  E: { x: 455, y: 264, links: ["D", "F", "H", "J"] },
  F: { x: 566, y: 264, links: ["E"] },
  G: { x: 205, y: 120, links: ["B", "H"] },
  H: { x: 455, y: 120, links: ["G", "E"] },
  I: { x: 292, y: 304, links: ["C", "J"] },
  J: { x: 455, y: 304, links: ["I", "E"] },
  K: { x: 350, y: 350, links: ["D", "L"] },
  L: { x: 520, y: 350, links: ["K"] }
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
    flightLabel: "输入航班号", startNav: "开始导航", recent: "最近查询", indoorMap: "虚拟室内导航", minutes: "分钟", toGate: "步行至 32 号登机口",
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
    $("#navigation").scrollIntoView({ behavior: "smooth" });
    planIndoorRoute(button.dataset.navShop, isMetro ? "乘电梯前往 B1 · S1 号线" : "虚拟室内路网已规划");
  }));
  $$("[data-review-shop]").forEach((button) => button.addEventListener("click", () => {
    $("#modalShopName").textContent = button.dataset.reviewShop;
    $("#reviewModal").classList.add("open");
    $("#reviewModal").setAttribute("aria-hidden", "false");
  }));
}

function showToast(message) {
  const toast = $("#toast");
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(window.toastTimer);
  window.toastTimer = setTimeout(() => toast.classList.remove("show"), 2600);
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
});
$$("[data-flight]").forEach((button) => button.addEventListener("click", () => setFlight(button.dataset.flight)));
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
$("#openMiniProgram").addEventListener("click", () => showToast(language === "zh" ? "正在唤起机场服务小程序…" : "Opening airport mini program…"));

renderMerchants();
planIndoorRoute("Gate 32", "途经国内安检");
