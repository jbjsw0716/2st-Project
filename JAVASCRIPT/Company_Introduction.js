/* //새로고침 했을 때 맨 위로 이동 */
window.onload = function () {
  window.scrollTo(0, 0);
};

/* ---------------------------------------------------------------------------------------------------------------------------------------------- */
//연혁(History) 파트에만 해당

//타임라인바 클릭 시 타임라인바 활성화(색깔 변경)
$(".step").click(function () {
  $(this).addClass("active").prevAll().addClass("active");
  $(this).nextAll().removeClass("active");
});

//타임라인바 클릭 시 해당 파트(step01) 타임라인 본문 내용 활성화
$(".step01").click(function () {
  $("#line-progress").css("width", "3%");
  $(".discovery").addClass("active").siblings().removeClass("active");
});

//타임라인바 클릭 시 해당 파트(step02) 타임라인 본문 내용 활성화
$(".step02").click(function () {
  $("#line-progress").css("width", "25%");
  $(".strategy").addClass("active").siblings().removeClass("active");
});

//타임라인바 클릭 시 해당 파트(step03) 타임라인 본문 내용 활성화
$(".step03").click(function () {
  $("#line-progress").css("width", "50%");
  $(".creative").addClass("active").siblings().removeClass("active");
});

//타임라인바 클릭 시 해당 파트(step04) 타임라인 본문 내용 활성화
$(".step04").click(function () {
  $("#line-progress").css("width", "75%");
  $(".production").addClass("active").siblings().removeClass("active");
});

//타임라인바 클릭 시 해당 파트(step05) 타임라인 본문 내용 활성화
$(".step05").click(function () {
  $("#line-progress").css("width", "100%");
  $(".analysis").addClass("active").siblings().removeClass("active");
});

/* ---------------------------------------------------------------------------------------------------------------------------------------------- */
//회사소개 페이지 전체 애니메이션 적용하기

//ScrollReveal 홈페이지를 활용하여 자바 스크립트 생성하기
//ScrollReval 함수 스타일 정의
ScrollReveal({
  reset: true, //요소가 나타나고 숨겨질 때 애니메이션 효과를 리셋하는 여부를 결정
  distance: "60px", //요소가 이동하는 거리를 설정
  duration: 2500, //애니메이션의 지속 시간을 설정
  delay: 400, //애니메이션이 시작되기 전에 대기하는 시간을 설정
});

//ScrollReveal 함수를 이용하여 애니메이션이 나타나는 딜레이 설정
ScrollReveal().reveal(".main-title, .section-title", {
  dalay: 500,
  origin: "top",
});

ScrollReveal().reveal(".text-box", { dalay: 500, origin: "right" });
ScrollReveal().reveal(".image", { dalay: 500, origin: "right" });

ScrollReveal().reveal(".sec-02 .image", { dalay: 500, origin: "bottom" });
ScrollReveal().reveal("#progress-content-section", {
  dalay: 500,
  origin: "bottom",
});

ScrollReveal().reveal(".media-icons i, .media-icons img", {
  dalay: 500,
  origin: "bottom",
  interval: 200,
});

ScrollReveal().reveal("#progress-bar-container", {
  dalay: 500,
  origin: "left",
});

ScrollReveal().reveal(".sec-01 .image", { dalay: 500, origin: "left" });
ScrollReveal().reveal(".media-info li", {
  dalay: 500,
  origin: "left",
  interval: 200,
});

/* ---------------------------------------------------------------------------------------------------------------------------------------------- */
//회사소개 페이지의 하위 메뉴인 오시는 길에 쓰이는 지도 생성

//새로운 OpenLayers 지도 만들기
const map = new ol.Map({
  target: "map",
  layers: [
    new ol.layer.Tile({
      source: new ol.source.OSM(),
    }),
  ],
  view: new ol.View({
    center: ol.proj.fromLonLat([126.927081, 37.489996]), //한국정보교육원의 경도와 위도
    zoom: 16,
  }),
  size: [500, 500],
});

//아이콘 스타일 정의
const iconStyle = new ol.style.Style({
  image: new ol.style.Icon({
    anchor: [0.5, 1],
    src: "https://openlayers.org/en/latest/examples/data/icon.png", //핀 아이콘 이미지 경로
  }),
});

//핀을 표시할 위치 정의
const pinLocation = ol.proj.fromLonLat([126.927081, 37.489996]);

//Feature 생성
const pinFeature = new ol.Feature({
  geometry: new ol.geom.Point(pinLocation),
});

//스타일 설정
pinFeature.setStyle(iconStyle);

//Vector Layer 생성
const vectorLayer = new ol.layer.Vector({
  source: new ol.source.Vector({
    features: [pinFeature],
  }),
});

//WMS(웹 맵 서비스)레이어를 지도에 추가
map.addLayer(vectorLayer);