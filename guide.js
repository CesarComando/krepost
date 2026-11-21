// Аудиогид «Dinaburga 1810»: кольцевой маршрут по крепости, 13 точек + вступление и финал.
// Два старта: 1 — от остановки «Cietoksnis» у Михайловских ворот (въезд из города),
//             4 — от Николаевских ворот, у Водоподъёмного здания (Центр культуры и информации).
// Тексты — по книге «История Даугавпилсской крепости: правда и легенды» и стендам Центра крепости (сверка 19.11.2026).
// audio: файлы, которые уже озвучены (папка audio/; русская озвучка ElevenLabs 20.11.2026 — audio/ru/00–14). Нет файла — в приложении показывается текст.
// pos — место остановки для «подсказки у остановки» и карты маршрута (точность ±20 м).
// routes — маршруты: полный круг и короткий.
window.GUIDE_DATA = {
  routes: [
    { id: 'full', stops: [1,2,3,4,5,6,7,8,9,10,11,12,13] },
    { id: 'short', stops: [1,2,3,4,5] }
  ],
  intro: {
    n: 0, title: 'Вступление', extra: [{ src:'photos/gx_verh_1920.jpg', thumb:'photos/gx_verh_1920_t.jpg', year:'1920-1921', title:'Вид на крепость с собора', credit:'Источник: PastVu' }, { src:'photos/gx_verh_kazarmy.jpg', thumb:'photos/gx_verh_kazarmy_t.jpg', year:'1920-1930', title:'Вид с башни собора на казармы', credit:'Источник и автор не установлены' }, { src:'photos/gx_verh_kopskats.jpg', thumb:'photos/gx_verh_kopskats_t.jpg', year:'1930-е', title:'Крепость сверху, открытка «Kopskats»', credit:'Источник: Zudusī Latvija' }, { src:'photos/gx_verh_daugava.jpg', thumb:'photos/gx_verh_daugava_t.jpg', year:'1930-е', title:'Казармы и Даугава с высоты', credit:'Источник: Zudusī Latvija' }], caption: 'Как пользоваться аудиогидом · 2 минуты',
    img: 'photos/guide_intro_plan.jpg', imgPos: '50% 38%',
    audio: { ru: 'audio/ru/00.mp3', en: 'audio/en/00.mp3', lv: 'audio/lv/00.mp3' },
    text: `Добро пожаловать в Даугавпилсскую крепость. Я буду вашим спутником на этой прогулке.

Сначала — как слушать. Маршрут идёт по кругу, в нём тринадцать остановок. Начать можно от автобусной остановки у Михайловских ворот — это точка номер один. Или от Николаевских ворот, у Водоподъёмного здания, — это точка номер четыре. Дальше просто идите по кругу, и вы обойдёте всю крепость. Вся прогулка — около трёх с половиной километров и часа два неспешного шага.

Каждый рассказ длится несколько минут и заканчивается подсказкой, куда идти дальше. Переключать точки можно свайпом влево и вправо или кнопками на экране блокировки. Телефон можно убрать в карман — звук не прервётся. Фотографировать не обязательно. Но если захотите, в приложении есть игра: найти место старого снимка и сделать свой кадр — тогда и сейчас.

Теперь несколько слов о том, где вы. Даугавпилс называют городом трёх укреплений. Около 1275 года крестоносцы построили замок выше по Даугаве, у нынешней Науене. В 1577 году войска Ивана Грозного разрушили его и поставили новый шанец здесь, ниже по реке. А в 1810 году по указу императора Александра Первого на этом месте начали строить большую крепость. Кирпич для неё поначалу брали даже из развалин того самого старого замка. Россия ждала войны с Наполеоном, и Даугава была рубежом на пути к Риге и Петербургу.

Строили долго — почти семьдесят лет. Крепость освятили в 1833 году, а последние работы закончили в 1878-м. За двести лет здесь стояли девять разных армий. Дольше всех — российская, латвийская и советская. Внутри валов — целый город: десять прямых улиц, казармы, арсеналы, дома офицеров, сад. Сегодня здесь живут больше тысячи человек. Поэтому, пожалуйста, будьте внимательны к жителям и к машинам. И осторожно на валах: склоны крутые.

Готовы? Тогда включайте точку, с которой начинаете.`,
      texts: {
        lv: `Laipni lūdzam Daugavpils cietoksnī. Es būšu jūsu pavadonis šajā pastaigā.

Vispirms — kā klausīties. Maršruts iet pa apli, tajā ir trīspadsmit pieturas. Sākt var no autobusu pieturas pie Mihaila vārtiem — tā ir pirmā pietura. Vai arī no Nikolaja vārtiem, pie Ūdenspacelšanas ēkas, — tā ir ceturtā pietura. Tālāk vienkārši ejiet pa apli, un jūs apiesiet visu cietoksni. Visa pastaiga ir ap trīsarpus kilometriem, mierīgā gaitā apmēram divas stundas.

Katrs stāsts ilgst dažas minūtes un beidzas ar norādi, kurp doties tālāk. Pieturas var pārslēgt, pavelkot pa labi vai pa kreisi, vai ar pogām bloķēšanas ekrānā. Telefonu var ielikt kabatā — skaņa nepārtrūks. Fotografēt nav obligāti. Bet, ja gribēsiet, lietotnē ir spēle: atrast vecā uzņēmuma vietu un uzņemt savu kadru — toreiz un tagad.

Tagad daži vārdi par to, kur jūs esat. Daugavpili sauc par trīs nocietinājumu pilsētu. Ap 1275. gadu krustneši uzcēla pili augšup pa Daugavu, pie tagadējās Naujenes. 1577. gadā Ivana Bargā karaspēks to nopostīja un uzcēla jaunu šanci šeit, lejāk pa upi. Bet 1810. gadā ar imperatora Aleksandra Pirmā ukazu šajā vietā sāka celt lielu cietoksni. Ķieģeļus tam sākumā ņēma pat no tās pašas vecās pils drupām. Krievija gaidīja karu ar Napoleonu, un Daugava bija robeža ceļā uz Rīgu un Pēterburgu.

Cēla ilgi — gandrīz septiņdesmit gadus. Cietoksni iesvētīja 1833. gadā, bet pēdējos darbus pabeidza 1878. gadā. Divsimt gadu laikā šeit atradās deviņas dažādas armijas. Visilgāk — Krievijas, Latvijas un padomju armija. Vaļņu iekšpusē ir vesela pilsēta: desmit taisnas ielas, kazarmas, arsenāli, virsnieku mājas, dārzs. Šodien šeit dzīvo vairāk nekā tūkstoš cilvēku. Tāpēc, lūdzu, esiet uzmanīgi pret iedzīvotājiem un mašīnām. Un uzmanīgi uz vaļņiem: nogāzes ir stāvas.

Gatavi? Tad ieslēdziet pieturu, no kuras sākat.`,
        en: `Welcome to Daugavpils Fortress. I will be your companion on this walk.

First, how to listen. The route goes in a circle and has thirteen stops. You can start at the bus stop by the Michael Gate — that is stop number one. Or at the Nicholas Gate, by the Water-lifting House — that is stop number four. Then simply keep walking round, and you will see the whole fortress. The whole walk is about three and a half kilometres, roughly two hours at an easy pace.

Each story lasts a few minutes and ends with a hint about where to go next. You can switch stops by swiping left and right, or with the buttons on your lock screen. You can put the phone in your pocket — the sound will not stop. You don't have to take photos. But if you want to, the app has a game: find the spot where an old photograph was taken and take your own picture — then and now.

Now a few words about where you are. Daugavpils is called the town of three fortifications. Around 1275 the crusaders built a castle further up the Daugava, near today's Naujene. In 1577 the troops of Ivan the Terrible destroyed it and built a new earthwork here, further downstream. And in 1810, by order of Emperor Alexander the First, work began on a great fortress on this spot. At first, bricks for it were even taken from the ruins of that very old castle. Russia was expecting war with Napoleon, and the Daugava was a barrier on the way to Riga and St Petersburg.

The building took a long time — almost seventy years. The fortress was consecrated in 1833, and the last works were finished in 1878. Over two hundred years, nine different armies were stationed here. The longest were the Russian, the Latvian and the Soviet. Inside the ramparts is a whole town: ten straight streets, barracks, arsenals, officers' houses, a garden. Today more than a thousand people live here. So please be considerate towards the residents and watch out for cars. And be careful on the ramparts: the slopes are steep.

Ready? Then play the stop where you are starting.`
      }
  },
  stops: [
    {
      n: 1, id: 'mihaila', extra: [{ src:'photos/gx_mihaila_most.jpg', thumb:'photos/gx_mihaila_most_t.jpg', year:'1920-1930', title:'Мост к Михайловским воротам, собор вдали', credit:'Источник и автор не установлены' }, { src:'photos/gx_mihaila_tanki.jpg', thumb:'photos/gx_mihaila_tanki_t.jpg', year:'1935-1938', title:'Танки латвийской армии у Михайловских ворот', credit:'Источник: PastVu' }], title: 'Михайловские ворота', caption: 'Въезд из города · остановка «Cietoksnis» · начало маршрута 1',
      pos: [55.883273, 26.499206], // примерно, по OSM (20.11.2026)
      img: 'photos/guide_mikhail_gate.jpg', imgPos: '50% 55%',
      spot: 's046', group: 'Михайловские ворота', audio: { ru: 'audio/ru/01.mp3', en: 'audio/en/01.mp3', lv: 'audio/lv/01.mp3' },
      text: `Вы стоите у главного въезда в крепость со стороны города. Перед вами Михайловские ворота.

Всего ворот четыре, и все названы в честь сыновей императора Павла Первого — Александра Первого и его братьев: Николаевские, Михайловские, Александровские и Константиновские. Проект этих ворот архитектор Военного министерства Александр Штауберт сделал ещё в 1816 году. В 1821 году в валу прорезали проход, потом несколько лет клали стены, и около 1827 года фасад облицевали гранитом. Присмотритесь: строгий каменный фасад напоминает Египет — так и говорят, «египетский стиль».

Когда-то сюда нельзя было просто подъехать. Перед воротами стояли ещё двое барьерных ворот и три деревянных моста через рвы. Их можно было быстро разобрать при осаде. Над проездом висели иконы, вход украшали императорские орлы, чугунные алебарды и декоративные ядра. А замок этих ворот с ключом весом до двадцати восьми килограммов сегодня хранится в краеведческом музее.

В двадцатых годах прошлого века латвийская армия убрала старые мосты. Осенью 1924 года ров засыпали землёй с валов, за зиму разобрали основной мост, а весной 1925 года на насыпи уже лежал асфальт. Последние остатки мостов снесли 30 декабря 1926 года.

Обернитесь к арке за воротами. Это арка седьмого полуконтргарда — части внешних укреплений. На ней памятная доска татарскому поэту Мусе Джалилю. Осенью 1942 года он был узником лагеря военнопленных, который немцы устроили в крепости.

В советское время здесь был главный пропускной пункт военного авиационного училища. Посторонних в крепость не пускали почти полвека.

Теперь пройдите через ворота в крепость. Через пару минут справа откроется большая открытая площадка, а рядом старое здание с толстыми стенами. Здесь стоял собор.`,
      texts: {
        lv: `Jūs stāvat pie galvenās iebrauktuves cietoksnī no pilsētas puses. Jūsu priekšā ir Mihaila vārti.

Pavisam ir četri vārti, un visi nosaukti imperatora Pāvila Pirmā dēlu — Aleksandra Pirmā un viņa brāļu — vārdā: Nikolaja, Mihaila, Aleksandra un Konstantīna vārti. Pirmos vārtu projektus Kara ministrijas arhitekts Aleksandrs Štauberts izstrādāja jau 1816. gadā. 1821. gadā valnī izcirta eju, pēc tam vairākus gadus mūrēja sienas, un ap 1827. gadu fasādi apšuva ar granītu. Ieskatieties: stingrā akmens fasāde atgādina Ēģipti — tā arī saka, «ēģiptiskais stils».

Kādreiz šeit nevarēja vienkārši piebraukt. Vārtu priekšā stāvēja vēl divi barjeru vārti un trīs koka tilti pār grāvjiem. Aplenkuma gadījumā tos varēja ātri izjaukt. Virs caurbrauktuves karājās ikonas, ieeju rotāja imperatora ērgļi, čuguna alebardas un dekoratīvas lodes. Bet šo vārtu slēdzene ar atslēgu, kas sver līdz divdesmit astoņiem kilogramiem, šodien glabājas Novadpētniecības muzejā.

Pagājušā gadsimta divdesmitajos gados Latvijas armija novāca vecos tiltus. 1924. gada rudenī grāvi aizbēra ar zemi no vaļņiem, ziemā izjauca galveno tiltu, un 1925. gada pavasarī uz uzbēruma jau bija asfalts. Pēdējās tiltu paliekas nojauca 1926. gada 30. decembrī.

Pagriezieties pret arku aiz vārtiem. Tā ir septītā puskontrgarda arka — daļa no ārējiem nocietinājumiem. Uz tās ir piemiņas plāksne tatāru dzejniekam Musam Džalilam. 1942. gada rudenī viņš bija karagūstekņu nometnes ieslodzītais, ko vācieši ierīkoja cietoksnī.

Padomju laikā šeit bija kara aviācijas skolas galvenais caurlaides punkts. Svešus cietoksnī nelaida gandrīz pusgadsimtu.

Tagad ejiet cauri vārtiem cietoksnī. Pēc pāris minūtēm pa labi pavērsies liels atklāts laukums, bet blakus — veca ēka ar biezām sienām. Šeit stāvēja katedrāle.`,
        en: `You are standing at the main entrance to the fortress from the town. In front of you is the Michael Gate.

There are four gates in all, and all are named after the sons of Emperor Paul the First — Alexander the First and his brothers: the Nicholas, Michael, Alexander and Constantine Gates. The War Ministry architect Alexander Staubert made the first gate designs as early as 1816. In 1821 a passage was cut through the rampart, then for several years the walls were built, and around 1827 the facade was faced with granite. Take a close look: the austere stone facade is reminiscent of Egypt — people even call it the "Egyptian style".

Once you could not simply drive up here. In front of the gate stood two more barrier gates and three wooden bridges over the moats. They could be taken apart quickly in a siege. Icons hung above the passage, and the entrance was decorated with imperial eagles, cast-iron halberds and ornamental cannonballs. The lock of this gate, with a key weighing up to twenty-eight kilograms, is kept today in the Regional Museum.

In the 1920s the Latvian army removed the old bridges. In autumn 1924 the moat was filled with earth from the ramparts, over the winter the main bridge was taken down, and by spring 1925 there was already asphalt on the causeway. The last remains of the bridges were removed on 30 December 1926.

Turn towards the arch behind the gate. This is the arch of the seventh half-counterguard, part of the outer fortifications. On it is a memorial plaque to the Tatar poet Musa Jalil. In autumn 1942 he was a prisoner in the prisoner-of-war camp the Germans set up in the fortress.

In Soviet times this was the main checkpoint of the military aviation school. For almost half a century outsiders were not allowed into the fortress.

Now walk through the gate into the fortress. In a couple of minutes a large open area will appear on your right, with an old thick-walled building next to it. This is where the cathedral stood.`
      }
    },
    {
      n: 2, id: 'sobor', extra: [{ src:'photos/gx_sobor_otkrytka.jpg', thumb:'photos/gx_sobor_otkrytka_t.jpg', year:'1900-1920', title:'Открытка: собор над валом', credit:'Источник: Facebook, Old Daugavpils. Автор не установлен' }, { src:'photos/gx_sobor_bashni.jpg', thumb:'photos/gx_sobor_bashni_t.jpg', year:'1920-1940', title:'Башни собора', credit:'Источник и автор не установлены' }], title: 'Место собора и иезуитский коллегиум', caption: 'Улица Императора · фундамент храма, коллегиум, могила коменданта Пиленко',
      pos: [55.883983, 26.499238], // примерно, по OSM (20.11.2026)
      img: 'photos/guide_cathedral.jpg', imgPos: '50% 22%',
      spot: 's083', group: 'Собор', audio: { ru: 'audio/ru/02.mp3', en: 'audio/en/02.mp3', lv: 'audio/lv/02.mp3' },
      text: `Здесь, на этой площадке, двести лет стоял самый высокий храм города. Его две белые башни поднимались примерно на шестьдесят метров. Крестьяне, ехавшие на рынок, видели их за много километров.

История этого места старше самой крепости. В 1629 году смоленский воевода Александр Гонсевский сделал пожертвование иезуитам — в благодарность за победу над шведами. Иезуиты построили здесь коллегиум и деревянную церковь. А в 1737–1746 годах появился каменный храм в стиле барокко. Кто его автор, точно неизвестно. В архиве записан загадочный «итальянский архитектор». Одни исследователи думают, что это знаменитый Растрелли, другие — Карло Ронделли. Документами не подтверждено ни то, ни другое.

Когда вокруг начали строить крепость, храм отдали военным и сделали православным, а потом крепостным собором. Иконостас поставили на деньги императора Николая Первого, а в 1907 году художник Перминов расписал стены и своды. В латвийское время, с 1923 года, он был гарнизонной лютеранской церковью, а в боковых приделах служили католики и православные. В 1937 году здесь освятили орган.

Летом 1944 года собор погиб. Как именно, спорят до сих пор. Советская комиссия и книга военного училища писали, что немцы перед отступлением согнали людей в подвал и взорвали храм. Но соседний коллегиум уцелел, а от такого взрыва он пострадал бы. Есть и другие версии — артиллерийский обстрел: с башен немцы наблюдали за наступлением. После 1951 года руины разобрали, обломки ссыпали в ров и в подвал. Позже здесь поставили самолёт МиГ-19 — символ училища.

Рядом с площадкой — здание иезуитского коллегиума. Его часто называют самым старым каменным домом города. С 1948 по 2003 год в нём работала обычная школа для детей.

И ещё одна деталь. Возле собора хоронили комендантов и священников. Сохранилась одна могила — генерала Георгия Пиленко. Он командовал крепостью с 1882 года и умер в должности в 1884-м.

Теперь идите на юго-запад, к улице Михаила, к Артиллерийскому арсеналу. Это длинное двухэтажное здание с ровным рядом окон, недалеко от Михайловских ворот.`,
      texts: {
        lv: `Šeit, šajā laukumā, divsimt gadu stāvēja pilsētas augstākais dievnams. Tā divi baltie torņi slējās apmēram sešdesmit metru augstumā. Zemnieki, kas brauca uz tirgu, tos redzēja daudzu kilometru attālumā.

Šīs vietas vēsture ir vecāka par pašu cietoksni. 1629. gadā Smoļenskas vojevoda Aleksandrs Gonsevskis ziedoja jezuītiem — pateicībā par uzvaru pār zviedriem. Jezuīti šeit uzcēla kolēģiju un koka baznīcu. Bet 1737.–1746. gadā parādījās mūra baznīca baroka stilā. Kas bija tās autors, precīzi nav zināms. Arhīvā ierakstīts mīklains «itāļu arhitekts». Vieni pētnieki domā, ka tas ir slavenais Rastrelli, citi — Karlo Rondelli. Dokumenti neapstiprina ne vienu, ne otru.

Kad apkārt sāka celt cietoksni, dievnamu nodeva militārajiem un padarīja par pareizticīgo, bet pēc tam par cietokšņa katedrāli. Ikonostasu uzstādīja par imperatora Nikolaja Pirmā naudu, bet 1907. gadā gleznotājs Perminovs apgleznoja sienas un velves. Latvijas laikā, no 1923. gada, tā bija luterāņu garnizona baznīca, bet sānu altāros kalpoja katoļi un pareizticīgie. 1937. gadā šeit iesvētīja ērģeles.

1944. gada vasarā katedrāle gāja bojā. Kā tieši, strīdas joprojām. Padomju komisija un kara skolas grāmata rakstīja, ka vācieši pirms atkāpšanās sadzinuši cilvēkus pagrabā un uzspridzinājuši dievnamu. Bet blakus esošā kolēģija palika vesela, bet no tāda sprādziena tā būtu cietusi. Ir arī citas versijas — artilērijas apšaude: no torņiem vācieši vēroja uzbrukumu. Pēc 1951. gada drupas novāca, atlūzas sabēra grāvī un pagrabā. Vēlāk šeit uzstādīja lidmašīnu MiG-19 — skolas simbolu.

Blakus laukumam ir jezuītu kolēģijas ēka. To bieži sauc par pilsētas vecāko mūra namu. No 1948. līdz 2003. gadam tajā darbojās parasta bērnu skola.

Un vēl viena detaļa. Pie katedrāles apbedīja komandantus un priesterus. Saglabājies viens kaps — ģenerāļa Georgija Pilenko. Viņš komandēja cietoksni no 1882. gada un nomira amatā 1884. gadā.

Tagad ejiet uz dienvidrietumiem, uz Mihaila ielu, pie Artilērijas arsenāla. Tā ir gara divstāvu ēka ar vienmērīgu logu rindu, netālu no Mihaila vārtiem.`,
        en: `Here, on this open ground, the tallest church in the town stood for two hundred years. Its two white towers rose to about sixty metres. Peasants on their way to market could see them from many kilometres away.

The history of this place is older than the fortress itself. In 1629 Aleksander Gosiewski, Voivode of Smolensk, made a donation to the Jesuits — in thanks for a victory over the Swedes. The Jesuits built a college and a wooden church here. And in 1737 to 1746 a stone church in the Baroque style appeared. Who designed it is not known for certain. The archive records a mysterious "Italian architect". Some researchers think it was the famous Rastrelli, others Carlo Rondelli. Neither is confirmed by documents.

When the fortress began to be built around it, the church was handed over to the military and made Orthodox, and then the fortress cathedral. The iconostasis was paid for by Emperor Nicholas the First, and in 1907 the painter Perminov decorated the walls and vaults. In the Latvian period, from 1923, it was a Lutheran garrison church, while Catholics and Orthodox held services in the side chapels. In 1937 an organ was consecrated here.

In summer 1944 the cathedral was destroyed. How exactly is still debated. The Soviet commission and the military school's book wrote that before retreating the Germans drove people into the cellar and blew up the church. But the college next door survived, and it would have been damaged by such an explosion. There are other versions too — artillery fire: the Germans used the towers to watch the advance. After 1951 the ruins were cleared, and the rubble was dumped into the moat and the cellar. Later a MiG-19 aircraft, the symbol of the school, was placed here.

Next to the open ground is the Jesuit college. It is often called the oldest stone building in the town. From 1948 to 2003 an ordinary school for children worked in it.

And one more detail. Commandants and priests were buried by the cathedral. One grave survives — that of General Georgy Pilenko. He commanded the fortress from 1882 and died in office in 1884.

Now walk south-west, to Mihaila Street and the Artillery Arsenal. It is a long two-storey building with an even row of windows, not far from the Michael Gate.`
      }
    },
    {
      n: 3, id: 'arsenal', title: 'Артиллерийский арсенал и пороховой погреб', caption: 'Mihaila 3 · центр Марка Ротко · Дом Мартинсона',
      pos: [55.883664, 26.497543], // примерно, по OSM (20.11.2026)
      spot: 's352', group: 'Артиллерийский арсенал', audio: { ru: 'audio/ru/03.mp3', en: 'audio/en/03.mp3', lv: 'audio/lv/03.mp3' },
      text: `Это здание построили, чтобы хранить оружие. А сегодня здесь висят картины художника, который родился в этом городе и прославился на весь мир.

Перед вами Артиллерийский арсенал. Указ о нём подписали в августе 1831 года. Здание закончили в 1833-м, но приняли в работу только в 1836-м. Проект сделал архитектор Александр Штауберт — тот самый, по чьим чертежам построены почти все каменные здания крепости. Арсенал поставили так, чтобы снабжать оружием мостовое укрепление и береговые бастионы. Сюда перевезли запасы Виленского арсенала, здесь работали мастерские лафетов.

Потом крепость стала складом, и арсенал превратился в артиллерийский склад. В латвийское время здесь были службы Земгальской дивизии, даже ветеринарная клиника. В советское время — столовая, а потом казарма курсантов.

С 24 апреля 2013 года здесь центр Марка Ротко. Ротко родился в Двинске, как тогда назывался Даугавпилс, в 1903 году. Ребёнком он уехал с семьёй в Америку и стал одним из самых известных художников двадцатого века. Говорят, это единственное место в Восточной Европе, где можно увидеть его подлинные работы.

Рядом, в валу седьмого бастиона, — пороховой погреб, построенный в 1859–1861 годах. Под мощным кирпичным сводом на деревянных стеллажах стояли бочки с порохом. Во время войны немцы держали в пороховых погребах советских военнопленных. В советское время здесь квасили капусту для училища. А с 2022 года это Дом Мартинсона — выставка керамики знаменитого латвийского мастера Петериса Мартинсона.

Если устали — в арсенале есть кафе. Дальше идите к Николаевским воротам — они совсем рядом, у реки. Рядом с ними — небольшое кирпичное здание в стиле неоготики, его называют «пряничным домиком». Это Водоподъёмное здание.`,
      texts: {
        lv: `Šo ēku uzcēla, lai glabātu ieročus. Bet šodien šeit karājas gleznas māksliniekam, kurš dzimis šajā pilsētā un kļuva slavens visā pasaulē.

Jūsu priekšā ir Artilērijas arsenāls. Ukazu par to parakstīja 1831. gada augustā. Ēku pabeidza 1833. gadā, bet darbā pieņēma tikai 1836. gadā. Projektu izstrādāja arhitekts Aleksandrs Štauberts — tas pats, pēc kura rasējumiem uzceltas gandrīz visas cietokšņa mūra ēkas. Arsenālu novietoja tā, lai apgādātu ar ieročiem tilta nocietinājumu un krasta bastionus. Šurp pārveda Viļņas arsenāla krājumus, šeit strādāja lafešu darbnīcas.

Vēlāk cietoksnis kļuva par noliktavu, un arsenāls pārvērtās artilērijas noliktavā. Latvijas laikā šeit atradās Zemgales divīzijas dienesti, pat veterinārā klīnika. Padomju laikā — ēdnīca, bet pēc tam kursantu kazarma.

Kopš 2013. gada 24. aprīļa šeit ir Marka Rotko mākslas centrs. Rotko dzima Dvinskā, kā toreiz sauca Daugavpili, 1903. gadā. Bērnībā viņš ar ģimeni aizbrauca uz Ameriku un kļuva par vienu no slavenākajiem divdesmitā gadsimta māksliniekiem. Saka, ka šī ir vienīgā vieta Austrumeiropā, kur var redzēt viņa oriģināldarbus.

Blakus, septītā bastiona valnī, ir pulvera pagrabs, uzbūvēts 1859.–1861. gadā. Zem varenās ķieģeļu velves uz koka plauktiem stāvēja mucas ar šaujampulveri. Kara laikā vācieši pulvera pagrabos turēja padomju karagūstekņus. Padomju laikā šeit skolai skāba kāpostus. Bet kopš 2022. gada tas ir Mārtiņsona nams — slavenā latviešu meistara Pētera Mārtiņsona keramikas izstāde.

Ja esat noguruši — arsenālā ir kafejnīca. Tālāk ejiet pie Nikolaja vārtiem — tie ir pavisam tuvu, pie upes. Blakus tiem ir neliela neogotiska ķieģeļu ēka, to sauc par «piparkūku namiņu». Tā ir Ūdenspacelšanas ēka.`,
        en: `This building was built to store weapons. Today it holds paintings by an artist who was born in this town and became famous all over the world.

In front of you is the Artillery Arsenal. The decree for it was signed in August 1831. The building was finished in 1833 but taken into use only in 1836. It was designed by the architect Alexander Staubert — the same man whose drawings were used for almost all the stone buildings of the fortress. The arsenal was placed so that it could supply weapons to the bridgehead and the riverside bastions. The stores of the Vilnius arsenal were brought here, and gun-carriage workshops worked here.

Later the fortress became a depot, and the arsenal turned into an artillery store. In the Latvian period it housed services of the Zemgale Division, even a veterinary clinic. In Soviet times — a canteen, and then a cadets' barracks.

Since 24 April 2013 this has been the Mark Rothko Art Centre. Rothko was born in Dvinsk, as Daugavpils was then called, in 1903. As a child he left with his family for America and became one of the best-known artists of the twentieth century. It is said to be the only place in Eastern Europe where you can see his original works.

Nearby, in the rampart of the seventh bastion, is a powder magazine built in 1859 to 1861. Under its massive brick vault, barrels of gunpowder stood on wooden racks. During the war the Germans held Soviet prisoners of war in the powder magazines. In Soviet times cabbage was pickled here for the school. And since 2022 it has been the Martinsons House — an exhibition of ceramics by the famous Latvian master Pēteris Martinsons.

If you are tired, there is a café in the arsenal. Next, walk to the Nicholas Gate — it is very close, by the river. Next to it is a small Neo-Gothic brick building people call the "gingerbread house". This is the Water-lifting House.`
      }
    },
    {
      n: 4, id: 'voda', title: 'Водоподъёмное здание', caption: 'Nikolaja 5 · Центр культуры и информации · начало маршрута 2',
      pos: [55.883857, 26.495901], // примерно, по OSM (20.11.2026)
      img: 'photos/spot103.jpg', imgPos: '40% 50%',
      spot: null, group: 'Водоподъёмное здание', audio: { ru: 'audio/ru/04.mp3', en: 'audio/en/04.mp3', lv: 'audio/lv/04.mp3' },
      text: `Если вы начинаете прогулку здесь — сначала послушайте вступление, а потом возвращайтесь к этой точке.

Перед вами Водоподъёмное здание — первый водопровод в Латгалии. Его построили в 1865–1866 годах. Внутри стояли котёл и паровая машина. Машина приводила в движение насосы, и они качали воду из Даугавы по подземной трубе наверх, в большой клёпаный бак. Бак вмещал три тысячи вёдер — почти тридцать семь кубометров. Из него вода шла по всей цитадели, в казармы, кухни, конюшни и даже в фонтан Комендантского сада.

Рядом со зданием поднимался высокий дымоход — вдвое выше крыши. Его разобрали только в конце 1930-х годов. В советское время здесь была насосная станция, а потом здание опустело.

Его восстановили в 2010–2011 годах, и теперь здесь Центр культуры и информации крепости. Обязательно зайдите внутрь. Бак 1866 года до сих пор висит под потолком. Ведёт к нему деревянная лестница тех же лет. А на кирпичном своде над лестницей вмурована чёрная плита 1866 года. На ней имена строителей — инженер-полковник Михайлов и мастер Битнер. За одной из стен когда-то стоял котёл, который топили, чтобы получить пар.

Кстати, отсюда, из-под этих зданий, действительно уходят под землю трубы — к фонтану и к казармам. Настоящие подземные ходы крепости — это трубы, потерны в валах и дренажи. А легенды о тоннеле под Даугавой выросли как раз из них.

Теперь выходите к Николаевским воротам. Это ворота с зубцами, как у замка, и длинным деревянным мостом через ров.`,
      texts: {
        lv: `Ja jūs sākat pastaigu šeit — vispirms noklausieties ievadu, bet pēc tam atgriezieties pie šīs pieturas.

Jūsu priekšā ir Ūdenspacelšanas ēka — pirmais ūdensvads Latgalē. To uzcēla 1865.–1866. gadā. Iekšā stāvēja katls un tvaika mašīna. Mašīna darbināja sūkņus, un tie sūknēja ūdeni no Daugavas pa pazemes cauruli augšā, lielā kniedētā tvertnē. Tvertnē ietilpa trīs tūkstoši spaiņu — gandrīz trīsdesmit septiņi kubikmetri. No tās ūdens gāja pa visu citadeli — uz kazarmām, virtuvēm, staļļiem un pat uz Komandanta dārza strūklaku.

Blakus ēkai slējās augsts dūmenis — divreiz augstāks par jumtu. To nojauca tikai 1930. gadu beigās. Padomju laikā šeit bija sūkņu stacija, bet pēc tam ēka palika tukša.

To atjaunoja 2010.–2011. gadā, un tagad šeit ir Cietokšņa kultūras un informācijas centrs. Noteikti ieejiet iekšā. 1866. gada tvertne joprojām karājas zem griestiem. Pie tās ved tā paša laika koka kāpnes. Bet ķieģeļu velvē virs kāpnēm iemūrēta melna 1866. gada plāksne. Uz tās ir būvētāju vārdi — inženieru pulkvedis Mihailovs un meistars Bitners. Aiz vienas no sienām kādreiz stāvēja katls, ko kurināja, lai iegūtu tvaiku.

Starp citu, no šejienes, no šīm ēkām, tiešām iet pazemē caurules — uz strūklaku un kazarmām. Cietokšņa īstās pazemes ejas ir caurules, poternas vaļņos un drenāžas. Bet leģendas par tuneli zem Daugavas izauga tieši no tām.

Tagad izejiet pie Nikolaja vārtiem. Tie ir vārti ar robiem kā pilij un garu koka tiltu pār grāvi.`,
        en: `If you are starting your walk here, listen to the introduction first, then come back to this stop.

In front of you is the Water-lifting House — the first water supply system in Latgale. It was built in 1865 to 1866. Inside stood a boiler and a steam engine. The engine drove the pumps, and they pumped water from the Daugava through an underground pipe up into a large riveted tank. The tank held three thousand buckets — almost thirty-seven cubic metres. From it the water went all over the citadel: to the barracks, kitchens, stables and even to the fountain in the Commandant's Garden.

Beside the building rose a tall chimney, twice as high as the roof. It was taken down only in the late 1930s. In Soviet times this was a pumping station, and then the building stood empty.

It was restored in 2010 to 2011, and now it houses the Fortress Culture and Information Centre. Do go inside. The tank of 1866 still hangs under the ceiling. A wooden staircase of the same years leads up to it. And set into the brick vault above the staircase is a black plaque of 1866. It bears the names of the builders — Engineer Colonel Mikhailov and master Bitner. Behind one of the walls once stood the boiler that was fired to make steam.

By the way, pipes really do run underground from here — to the fountain and to the barracks. The real underground passages of the fortress are pipes, posterns in the ramparts and drains. And the legends about a tunnel under the Daugava grew out of them.

Now go out to the Nicholas Gate. It is the gate with battlements like a castle and a long wooden bridge over the moat.`
      }
    },
    {
      n: 5, id: 'nikolaja', extra: [{ src:'photos/gx_nikolaja_zima.jpg', thumb:'photos/gx_nikolaja_zima_t.jpg', year:'', title:'Николаевские ворота зимой', credit:'Источник: Facebook, Old Daugavpils. Автор не установлен' }], title: 'Николаевские ворота и мост через ров', caption: 'Парадный вход с реки · 1-й береговой люнет · вид на мостовое укрепление',
      pos: [55.883424, 26.495934], // примерно, по OSM (20.11.2026)
      spot: 's065', group: 'Николаевские ворота', audio: { ru: 'audio/ru/05.mp3', en: 'audio/en/05.mp3', lv: 'audio/lv/05.mp3' },
      text: `Эти ворота смотрят на Даугаву. Когда-то через них в крепость въезжали с реки — торжественно, как в настоящий замок.

Проект утвердил в 1824 году великий князь Николай Павлович, будущий император, — в его честь ворота и названы. Строили их в 1825–1827 годах по проекту Александра Штауберта, между седьмым и восьмым бастионами. Образцом фасада стал форт Франц в немецком Кобленце: отсюда зубцы и стрельчатые окна. С 1826 года через крепость пошёл почтовый тракт из Петербурга в Варшаву, и эти ворота стали парадными.

Николаевские ворота — единственные с комнатами по бокам проезда. Там были караульня и камеры для арестованных. Зимой 1864 года в правом каземате сидел художник Альфред Ремер, участник польского восстания. В заключении он рисовал: ворота, свою камеру, солдата на посту. Эти рисунки сохранились.

Повернитесь к реке. Видите на том берегу валы? Это мостовое укрепление. Летом 1812 года именно оно три дня отбивало атаки корпуса маршала Удино. Французская кавалерия полковника Марбо пыталась прорваться по шаткому наплавному мосту без перил — всадники шли с промежутками, лошади падали в реку. Атаку отбили. Но крепость была не достроена, и через две недели гарнизон по приказу ушёл. В крепость без боя вошла бригада генерала Рикара из корпуса маршала Макдональда, и французы срыли укрепления. Позже, в 1941 году, в мостовом укреплении нацисты устроили еврейское гетто. Сегодня там тюрьма, а у её стен — памятный камень узникам гетто.

В советское время проход этих ворот заложили и устроили внутри овощной склад. Ворота восстановили в 2012–2013 годах. Мост через ров длиной пятьдесят пять метров построили заново. А внутренние деревянные створки ворот — подлинные, каждая весит пятьсот пятьдесят килограммов. Рядом, у въезда с моста, — первый береговой люнет с кордегардией, караульней на пятнадцать солдат. Его отреставрировали в 2014 году.

Внутри ворот сейчас выставка «Дверь в прошлое» и центр летучих мышей. Крепость — главное место их зимовки в Латвии. Каждую зиму здесь спят около тысячи летучих мышей шести видов.

Теперь пройдите через ворота в крепость и идите прямо по улице Николая. Через несколько минут справа будет очень длинное здание складов — Провиантский магазин.`,
      texts: {
        lv: `Šie vārti raugās uz Daugavu. Kādreiz pa tiem cietoksnī iebrauca no upes puses — svinīgi, kā īstā pilī.

Projektu 1824. gadā apstiprināja lielkņazs Nikolajs Pavlovičs, vēlākais imperators, — viņa vārdā vārti arī nosaukti. Tos būvēja 1825.–1827. gadā pēc Aleksandra Štauberta projekta, starp septīto un astoto bastionu. Fasādes paraugs bija Franča forts Vācijas Koblencā: no turienes robi un smailloka logi. No 1826. gada caur cietoksni gāja pasta ceļš no Pēterburgas uz Varšavu, un šie vārti kļuva par parādes vārtiem.

Nikolaja vārti ir vienīgie ar telpām abpus caurbrauktuvei. Tur bija sargtelpa un kameras arestētajiem. 1864. gada ziemā labajā kazemātā sēdēja mākslinieks Alfrēds Rēmers, poļu sacelšanās dalībnieks. Ieslodzījumā viņš zīmēja: vārtus, savu kameru, karavīru sardzē. Šie zīmējumi ir saglabājušies.

Pagriezieties pret upi. Redzat otrā krastā vaļņus? Tas ir tilta nocietinājums. 1812. gada vasarā tieši tas trīs dienas atvairīja maršala Udino korpusa uzbrukumus. Pulkveža Marbo franču kavalērija mēģināja izlauzties pa šūpojošo pontonu tiltu bez margām — jātnieki gāja ar atstarpēm, zirgi krita upē. Uzbrukumu atsita. Bet cietoksnis nebija pabeigts, un pēc divām nedēļām garnizons pēc pavēles aizgāja. Cietoksnī bez kaujas ienāca ģenerāļa Rikāra brigāde no maršala Makdonalda korpusa, un francūži noārdīja nocietinājumus. Vēlāk, 1941. gadā, tilta nocietinājumā nacisti ierīkoja ebreju geto. Šodien tur ir cietums, bet pie tā sienām — piemiņas akmens geto ieslodzītajiem.

Padomju laikā šo vārtu caurbrauktuvi aizmūrēja un iekšā ierīkoja dārzeņu noliktavu. Vārtus atjaunoja 2012.–2013. gadā. Piecdesmit piecus metrus garo tiltu pār grāvi uzbūvēja no jauna. Bet vārtu iekšējās koka vērtnes ir oriģinālās, katra sver piecsimt piecdesmit kilogramus. Blakus, pie tilta gala, — pirmā krasta lunete ar sargmāju piecpadsmit karavīriem. To restaurēja 2014. gadā.

Vārtu iekšpusē tagad ir izstāde «Durvis pagātnē» un sikspārņu centrs. Cietoksnis ir galvenā sikspārņu ziemošanas vieta Latvijā. Katru ziemu šeit guļ ap tūkstoš sikspārņu sešu sugu.

Tagad ejiet cauri vārtiem cietoksnī un dodieties taisni pa Nikolaja ielu. Pēc dažām minūtēm pa labi būs ļoti gara noliktavu ēka — Proviantu noliktava.`,
        en: `This gate faces the Daugava. Once people entered the fortress through it from the river — in ceremony, as if into a real castle.

The design was approved in 1824 by Grand Duke Nicholas Pavlovich, the future emperor — and the gate is named after him. It was built in 1825 to 1827 to Alexander Staubert's design, between the seventh and eighth bastions. The model for the facade was Fort Franz in Koblenz in Germany: hence the battlements and pointed windows. From 1826 the post road from St Petersburg to Warsaw ran through the fortress, and this gate became the ceremonial gate.

The Nicholas Gate is the only one with rooms on both sides of the passage. There were a guardroom and cells for prisoners. In the winter of 1864 the artist Alfred Römer, a participant in the Polish uprising, was held in the right-hand casemate. In prison he drew: the gate, his cell, a soldier on guard. These drawings survive.

Turn towards the river. Can you see ramparts on the far bank? That is the bridgehead. In summer 1812 it held off the attacks of Marshal Oudinot's corps for three days. Colonel Marbot's French cavalry tried to break through across the swaying pontoon bridge with no railings — the riders went with gaps between them, and horses fell into the river. The attack was beaten off. But the fortress was unfinished, and two weeks later the garrison left on orders. General Ricard's brigade of Marshal Macdonald's corps entered the fortress without a fight, and the French tore down the fortifications. Later, in 1941, the Nazis set up a Jewish ghetto in the bridgehead. Today there is a prison there, and by its walls a memorial stone to the prisoners of the ghetto.

In Soviet times the passage of this gate was walled up and a vegetable store was set up inside. The gate was restored in 2012 to 2013. The fifty-five-metre bridge over the moat was built anew. But the inner wooden leaves of the gate are original — each weighs five hundred and fifty kilograms. Nearby, at the end of the bridge, is the first riverside lunette with its guardhouse, a watch-house for fifteen soldiers. It was restored in 2014.

Inside the gate today there is the exhibition "Door to the Past" and a bat centre. The fortress is the main place in Latvia where bats spend the winter. Every winter about a thousand bats of six species sleep here.

Now walk through the gate into the fortress and go straight along Nikolaja Street. After a few minutes, on your right, there will be a very long storehouse — the Provision Magazine.`
      }
    },
    {
      n: 6, id: 'proviant', title: 'Провиантский магазин и «Призрак крепости»', caption: 'Nikolaja 9 · самый большой склад крепости · белый конь',
      pos: [55.884164, 26.494753], // примерно, по OSM (20.11.2026)
      spot: null, group: 'Улицы и здания', audio: { ru: 'audio/ru/06.mp3', en: 'audio/en/06.mp3', lv: 'audio/lv/06.mp3' },
      text: `Крепость должна была выдержать долгую осаду. А для этого нужно много еды. Перед вами самый большой склад крепости — Провиантский магазин.

Его построили в 1830–1834 годах, вероятно, по проекту того же Штауберта. Здесь двадцать одна секция с отдельными входами. Внутри помещалось около шести тысяч трёхсот тонн муки, хлеба, сыра и солонины. Была даже своя мукомольня. Своды делали кирпичными и толстыми — чтобы выдержали бомбы. А под полом шли вентиляционные каналы, чтобы зерно не гнило.

Военный министр требовал, чтобы в крепости всегда был запас продовольствия на полгода. В латвийское время здесь хранила запасы Земгальская дивизия, в советское — училище. С 1994 года здание почти не используется. Только в одной части работает галерея.

А теперь посмотрите на белого коня между домами. Его называют «Призрак крепости». Многие думают, что это старая легенда. Но нет — это скульптура 2017 года. Так прямо на ваших глазах рождается новый фольклор. Пройдёт пятьдесят лет, и кто-нибудь расскажет, что белый конь бродит по крепости с девятнадцатого века.

Продолжайте путь по улице Николая до улицы Коменданта. Ищите большой светлый трёхэтажный дом, рядом с садом. Это Комендантский дом.`,
      texts: {
        lv: `Cietoksnim bija jāiztur ilgs aplenkums. Un tam vajag daudz pārtikas. Jūsu priekšā ir lielākā cietokšņa noliktava — Proviantu noliktava.

To uzcēla 1830.–1834. gadā, iespējams, pēc tā paša Štauberta projekta. Šeit ir divdesmit viena sekcija ar atsevišķām ieejām. Iekšā ietilpa ap sešiem tūkstošiem trīssimt tonnu miltu, maizes, siera un sālītas gaļas. Bija pat savas dzirnavas. Velves taisīja no bieza ķieģeļa — lai izturētu bumbas. Bet zem grīdas gāja ventilācijas kanāli, lai graudi nepūtu.

Kara ministrs prasīja, lai cietoksnī vienmēr būtu pārtikas krājums pusgadam. Latvijas laikā šeit glabāja krājumus Zemgales divīzija, padomju laikā — kara skola. Kopš 1994. gada ēku gandrīz neizmanto. Tikai vienā daļā darbojas galerija.

Bet tagad paskatieties uz balto zirgu starp mājām. To sauc par «Cietokšņa spoku». Daudzi domā, ka tā ir veca leģenda. Bet nē — tā ir 2017. gada skulptūra. Tā tieši jūsu acu priekšā dzimst jauna folklora. Paies piecdesmit gadi, un kāds stāstīs, ka baltais zirgs klīst pa cietoksni kopš deviņpadsmitā gadsimta.

Turpiniet ceļu pa Nikolaja ielu līdz Komandanta ielai. Meklējiet lielu gaišu trīsstāvu namu blakus dārzam. Tas ir Komandanta nams.`,
        en: `A fortress had to withstand a long siege. And for that you need a lot of food. In front of you is the largest storehouse of the fortress — the Provision Magazine.

It was built in 1830 to 1834, probably to a design by the same Staubert. It has twenty-one sections with separate entrances. Inside there was room for about six thousand three hundred tonnes of flour, bread, cheese and salt meat. There was even a mill of its own. The vaults were made of thick brick so that they would withstand bombs. And under the floor ran ventilation ducts so that the grain would not rot.

The War Minister demanded that the fortress always have a six-month stock of food. In the Latvian period the Zemgale Division kept its supplies here, in Soviet times the military school. Since 1994 the building has hardly been used. Only one part houses a gallery.

Now look at the white horse between the buildings. It is called the "Fortress Ghost". Many people think it is an old legend. But no — it is a sculpture from 2017. This is how new folklore is born right before your eyes. In fifty years someone will tell you that the white horse has wandered the fortress since the nineteenth century.

Continue along Nikolaja Street to Komandanta Street. Look for a large, light three-storey house next to the garden. That is the Commandant's House.`
      }
    },
    {
      n: 7, id: 'komendant', title: 'Комендантский дом', caption: 'Komandanta 7 · путевой дворец · доска Кюхельбекеру',
      pos: [55.88577, 26.494324], // примерно, по OSM (20.11.2026)
      spot: 's423', group: 'Комендантский дом', audio: { ru: 'audio/ru/07.mp3', en: 'audio/en/07.mp3', lv: 'audio/lv/07.mp3' },
      text: `У этого дома — история о дружбе, которую не смогла разрушить даже тюрьма.

Перед вами дом коменданта крепости. Его построили к 1818 году по проекту Александра Штауберта. Здесь работало комендантское управление. А когда через крепость пошёл тракт из Петербурга в Европу, на третьем этаже устроили путевой дворец — комнаты для царской семьи. Здесь останавливались Александр Первый, Николай Первый, Александр Второй. Николай Первый бывал в крепости очень часто: с 1833 по 1852 год он осматривал стройку больше десяти раз.

На стене — мемориальная доска поэту Вильгельму Кюхельбекеру. Он учился в Царскосельском лицее вместе с Пушкиным и был его близким другом. В декабре 1825 года Кюхельбекер вышел на Сенатскую площадь вместе с декабристами. Его приговорили к долгому заключению, и с 1827 по 1831 год он сидел в Динабургской крепости. Где именно — неизвестно: доску повесили в 1975 году условно.

По дороге сюда случилось удивительное. В октябре 1827 года на почтовой станции Пушкин случайно увидел арестанта под конвоем — и узнал в нём лицейского друга. Они бросились обниматься, но жандармы растащили их. Пушкин сам записал эту встречу. Больше друзья никогда не виделись.

В советское время здесь был штаб авиационного училища. Сейчас в доме полиция. В 2025 году здесь отреставрировали красивую чугунную лестницу девятнадцатого века.

Через дорогу — Комендантский сад. Идите туда, в центр сада, к памятнику из пушек.`,
      texts: {
        lv: `Šim namam ir stāsts par draudzību, ko nespēja sagraut pat cietums.

Jūsu priekšā ir cietokšņa komandanta nams. To uzcēla līdz 1818. gadam pēc Aleksandra Štauberta projekta. Šeit strādāja komandantūra. Bet, kad caur cietoksni sāka iet lielceļš no Pēterburgas uz Eiropu, trešajā stāvā ierīkoja ceļa pili — istabas cara ģimenei. Šeit apmetās Aleksandrs Pirmais, Nikolajs Pirmais, Aleksandrs Otrais. Nikolajs Pirmais cietoksnī brauca ļoti bieži: no 1833. līdz 1852. gadam viņš būvdarbus apskatīja vairāk nekā desmit reizes.

Pie sienas ir piemiņas plāksne dzejniekam Vilhelmam Kīhelbekeram. Viņš mācījās Carskoje Selo licejā kopā ar Puškinu un bija viņa tuvs draugs. 1825. gada decembrī Kīhelbekers kopā ar dekabristiem izgāja Senāta laukumā. Viņam piesprieda ilgu ieslodzījumu, un no 1827. līdz 1831. gadam viņš sēdēja Dinaburgas cietoksnī. Kur tieši — nav zināms: plāksni 1975. gadā piestiprināja nosacīti.

Ceļā uz šejieni notika kas pārsteidzošs. 1827. gada oktobrī kādā pasta stacijā Puškins nejauši ieraudzīja arestantu konvoja pavadībā — un atpazina viņā savu liceja draugu. Viņi metās apskauties, bet žandarmi viņus izrāva. Puškins pats pierakstīja šo tikšanos. Vairāk draugi nekad neredzējās.

Padomju laikā šeit bija aviācijas skolas štābs. Tagad namā ir policija. 2025. gadā šeit restaurēja skaistas deviņpadsmitā gadsimta čuguna kāpnes.

Pāri ceļam ir Komandanta dārzs. Ejiet turp, uz dārza centru, pie pieminekļa no lielgabaliem.`,
        en: `This house has a story about a friendship that even prison could not destroy.

In front of you is the house of the fortress commandant. It was built by 1818 to Alexander Staubert's design. The commandant's office worked here. And when the highway from St Petersburg to Europe began to run through the fortress, a travel palace — rooms for the imperial family — was set up on the third floor. Alexander the First, Nicholas the First and Alexander the Second stayed here. Nicholas the First came to the fortress very often: between 1833 and 1852 he inspected the works more than ten times.

On the wall is a memorial plaque to the poet Wilhelm Küchelbecker. He studied at the Tsarskoye Selo Lyceum together with Pushkin and was his close friend. In December 1825 Küchelbecker went out onto Senate Square with the Decembrists. He was sentenced to long imprisonment, and from 1827 to 1831 he was held in Dinaburg Fortress. Where exactly is unknown: the plaque was put up in 1975 notionally.

On the way here something remarkable happened. In October 1827, at a post station, Pushkin happened to see a prisoner under escort — and recognised his friend from the Lyceum. They rushed to embrace, but the gendarmes pulled them apart. Pushkin himself wrote down this meeting. The friends never saw each other again.

In Soviet times this was the headquarters of the aviation school. Today the house is occupied by the police. In 2025 a beautiful nineteenth-century cast-iron staircase was restored here.

Across the road is the Commandant's Garden. Go there, to the centre of the garden, to the monument made of cannons.`
      }
    },
    {
      n: 8, id: 'sad', extra: [{ src:'photos/gx_sad_1912.jpg', thumb:'photos/gx_sad_1912_t.jpg', year:'1912-1915', title:'Памятник-фонтан к столетию войны 1812 года', credit:'Источник: PastVu' }, { src:'photos/gx_sad_1924.jpg', thumb:'photos/gx_sad_1924_t.jpg', year:'1920-1930', title:'Памятник воинам Освободительной войны', credit:'Источник и автор не установлены' }], title: 'Комендантский сад', caption: 'Бывший плац · памятник 1812 года · памятник воинам 1924 года',
      pos: [55.886372, 26.494968], // примерно, по OSM (20.11.2026)
      img: 'photos/guide_garden_postcard.jpg', imgPos: '50% 45%',
      spot: 's429', group: 'Комендантский сад и парк', audio: { ru: 'audio/ru/08.mp3', en: 'audio/en/08.mp3', lv: 'audio/lv/08.mp3' },
      text: `Когда-то здесь маршировали солдаты. Это было главное место крепости — парадный плац, квадрат сто пятьдесят на сто пятьдесят метров.

В середине девятнадцатого века плац превратили в сад. Когда в крепости появился водопровод, одну из первых труб провели сюда, и в саду забил фонтан. Здесь гуляли офицеры с семьями, а в деревянной беседке играл духовой оркестр.

В 1912 году, к столетию войны с Наполеоном, в саду поставили необычный памятник-фонтан. Посмотрите: три чугунные пушки стволами вверх, а наверху когда-то сидел бронзовый орёл на шаре. Надпись гласила: «Динабургъ Двинскъ 1810–1912». Орла сняли и увезли в 1915 году, когда к городу подходил фронт Первой мировой войны.

В углу сада — ещё один памятник. Его открыли 14 ноября 1924 года в память о воинах 10-го Айзпутского пехотного полка и Латышского стрелкового батальона, павших в борьбе за независимость Латвии. В основание замуровали капсулу с документами и именами погибших. В советское время памятник переделали в постамент: сначала на нём стоял бюст Сталина, потом Ленина. Потом его просто забросили. Восстановили памятник в 2017 году, на деньги жителей и государства.

Сад обновили совсем недавно, в 2026 году. Присядьте на скамейку, если хочется отдохнуть.

Следующая точка — длинное здание за садом, Военный госпиталь.`,
      texts: {
        lv: `Kādreiz šeit soļoja karavīri. Tā bija cietokšņa galvenā vieta — parādes laukums, kvadrāts simt piecdesmit reiz simt piecdesmit metru.

Deviņpadsmitā gadsimta vidū parādes laukumu pārvērta dārzā. Kad cietoksnī ierīkoja ūdensvadu, vienu no pirmajām caurulēm ievilka šurp, un dārzā sāka šalkt strūklaka. Šeit pastaigājās virsnieki ar ģimenēm, bet koka paviljonā spēlēja pūtēju orķestris.

1912. gadā, kara ar Napoleonu simtgadē, dārzā uzstādīja neparastu strūklaku-pieminekli. Paskatieties: trīs čuguna lielgabali ar stobriem uz augšu, bet augšā kādreiz sēdēja bronzas ērglis uz lodes. Uzraksts vēstīja: «Dinaburg Dvinsk 1810–1912». Ērgli noņēma un aizveda 1915. gadā, kad pilsētai tuvojās Pirmā pasaules kara fronte.

Dārza stūrī ir vēl viens piemineklis. To atklāja 1924. gada 14. novembrī par piemiņu 10. Aizputes kājnieku pulka un Latviešu strēlnieku bataljona karavīriem, kas krita cīņā par Latvijas neatkarību. Pamatos iemūrēja kapsulu ar dokumentiem un kritušo vārdiem. Padomju laikā pieminekli pārtaisīja par postamentu: vispirms uz tā stāvēja Staļina krūšutēls, pēc tam Ļeņina. Pēc tam to vienkārši pameta. Pieminekli atjaunoja 2017. gadā par iedzīvotāju un valsts naudu.

Dārzu atjaunoja pavisam nesen, 2026. gadā. Apsēdieties uz soliņa, ja gribas atpūsties.

Nākamā pietura ir garā ēka aiz dārza — Kara hospitālis.`,
        en: `Once soldiers marched here. This was the main place of the fortress — the parade ground, a square one hundred and fifty by one hundred and fifty metres.

In the middle of the nineteenth century the parade ground was turned into a garden. When the fortress got its water supply, one of the first pipes was laid here, and a fountain began to play in the garden. Officers walked here with their families, and a military band played in the wooden bandstand.

In 1912, for the centenary of the war with Napoleon, an unusual fountain monument was put up in the garden. Look: three cast-iron cannons pointing upwards, and on top there once sat a bronze eagle on a globe. The inscription read: "Dinaburg Dvinsk 1810–1912". The eagle was taken down and removed in 1915, when the front of the First World War was approaching the town.

In the corner of the garden is another monument. It was unveiled on 14 November 1924 in memory of the soldiers of the 10th Aizpute Infantry Regiment and the Latvian Rifle Battalion who fell fighting for Latvia's independence. A capsule with documents and the names of the fallen was sealed into the foundation. In Soviet times the monument was turned into a pedestal: first a bust of Stalin stood on it, then one of Lenin. Then it was simply abandoned. The monument was restored in 2017 with money from residents and the state.

The garden was renewed very recently, in 2026. Sit down on a bench if you would like a rest.

The next stop is the long building beyond the garden, the military hospital.`
      }
    },
    {
      n: 9, id: 'hospital', title: 'Военный госпиталь', caption: 'Hospitāļa 6 · госпиталь с 1820-х до 1994 года',
      pos: [55.887365, 26.495022], // примерно, по OSM (20.11.2026)
      spot: 's138', group: 'Военный госпиталь', audio: { ru: 'audio/ru/09.mp3', en: 'audio/en/09.mp3', lv: 'audio/lv/09.mp3' },
      text: `Это одно из самых больших зданий крепости. Почти сто семьдесят лет здесь лечили солдат.

Госпиталь строили с 1820 года по проекту Штауберта. Сначала он был на пятьсот коек, потом его расширили до девятисот. Здесь была своя аптека, а с 1874 года учили сестёр милосердия.

В Первую мировую войну через Двинск шёл фронт, и здесь был один из крупнейших госпиталей. Было даже отделение для немецких пленных. Осенью 1914 года госпиталь посетил император Николай Второй с семьёй.

В латвийское время здесь работала военная больница латвийской армии. В 1928 году в ней появились рентген и физиотерапия. А для прогулок больных был свой сад в одном из бастионов. В советское время — госпиталь Министерства обороны, он работал до 1994 года.

Сегодня здание пустует. Есть идея сделать здесь музей военной медицины, но пока это только планы.

Теперь идите по улице Императора на северо-восток, к Инженерному арсеналу. Это огромное здание с длинным фасадом почти в триста метров.`,
      texts: {
        lv: `Šī ir viena no lielākajām cietokšņa ēkām. Gandrīz simt septiņdesmit gadu šeit ārstēja karavīrus.

Hospitāli sāka būvēt 1820. gadā pēc Štauberta projekta. Sākumā tajā bija piecsimt gultu, vēlāk to paplašināja līdz deviņsimt. Šeit bija sava aptieka, bet no 1874. gada mācīja žēlsirdīgās māsas.

Pirmajā pasaules karā caur Dvinsku gāja fronte, un šeit bija viens no lielākajiem hospitāļiem. Bija pat nodaļa vācu gūstekņiem. 1914. gada rudenī hospitāli apmeklēja imperators Nikolajs Otrais ar ģimeni.

Latvijas laikā šeit darbojās Latvijas armijas kara slimnīca. 1928. gadā tajā parādījās rentgens un fizioterapija. Bet slimnieku pastaigām bija savs dārzs vienā no bastioniem. Padomju laikā — Aizsardzības ministrijas hospitālis, tas darbojās līdz 1994. gadam.

Šodien ēka stāv tukša. Ir ideja šeit izveidot kara medicīnas muzeju, bet pagaidām tie ir tikai plāni.

Tagad ejiet pa Imperatora ielu uz ziemeļaustrumiem, pie Inženieru arsenāla. Tā ir milzīga ēka ar gandrīz trīssimt metru garu fasādi.`,
        en: `This is one of the largest buildings in the fortress. For almost one hundred and seventy years soldiers were treated here.

The hospital was built from 1820 to Staubert's design. At first it had five hundred beds; later it was enlarged to nine hundred. It had its own pharmacy, and from 1874 nurses were trained here.

In the First World War the front ran through Dvinsk, and this was one of the largest hospitals. There was even a ward for German prisoners. In autumn 1914 Emperor Nicholas the Second visited the hospital with his family.

In the Latvian period it was the military hospital of the Latvian army. In 1928 it got X-rays and physiotherapy. And the patients had their own garden for walks in one of the bastions. In Soviet times it was a Ministry of Defence hospital, which worked until 1994.

Today the building is empty. There is an idea to make a museum of military medicine here, but so far it is only a plan.

Now walk along Imperatora Street to the north-east, to the Engineering Arsenal. It is a huge building with a long facade of almost three hundred metres.`
      }
    },
    {
      n: 10, id: 'inzhener', title: 'Инженерный арсенал', caption: 'Imperatora 8 · центр техники и промышленного дизайна',
      pos: [55.88568, 26.498723], // примерно, по OSM (20.11.2026)
      spot: 's347', group: 'Инженерный арсенал', audio: { ru: 'audio/ru/10.mp3', en: 'audio/en/10.mp3', lv: 'audio/lv/10.mp3' },
      text: `Это последнее здание, которое построил в крепости архитектор Александр Штауберт.

Инженерный арсенал возвели в 1840–1845 годах. Фасад тянется на двести семьдесят пять метров, а двор — около двух тысяч квадратных метров. Здесь были мастерские: малярная, столярная, колёсная, токарная, слесарная, литейная, чертёжная. Здесь делали и чинили оружие и шанцевый инструмент — лопаты, кирки, всё, чем копают окопы. Чтобы возы могли подниматься на второй этаж, построили пандусы.

В советское время здесь были учебные мастерские авиационного училища. А после 1993 года здание почти тридцать лет стояло пустым и разрушалось.

В 2019–2021 годах западное крыло отреставрировали. Теперь здесь центр техники и промышленного дизайна — с экспонатами, которые можно трогать.

Совсем рядом — Александровские ворота. Идите к валу, на улицу Оду.`,
      texts: {
        lv: `Šī ir pēdējā ēka, ko cietoksnī uzcēla arhitekts Aleksandrs Štauberts.

Inženieru arsenālu uzcēla 1840.–1845. gadā. Fasāde stiepjas divsimt septiņdesmit piecus metrus, bet pagalms ir ap divi tūkstoši kvadrātmetru. Šeit bija darbnīcas: krāsotāju, galdnieku, riteņu, virpotāju, atslēdznieku, lietuve un rasētava. Šeit izgatavoja un labo ieročus un ierakšanās rīkus — lāpstas, cērtes, visu, ar ko rok tranšejas. Lai rati varētu uzbraukt otrajā stāvā, izbūvēja uzbrauktuves.

Padomju laikā šeit bija aviācijas skolas mācību darbnīcas. Bet pēc 1993. gada ēka gandrīz trīsdesmit gadu stāvēja tukša un bruka.

2019.–2021. gadā rietumu spārnu restaurēja. Tagad šeit ir tehnikas un industriālā dizaina centrs — ar eksponātiem, kurus drīkst aizskart.

Pavisam tuvu ir Aleksandra vārti. Ejiet uz valņa pusi.`,
        en: `This is the last building that the architect Alexander Staubert built in the fortress.

The Engineering Arsenal was built in 1840 to 1845. Its facade stretches for two hundred and seventy-five metres, and the courtyard covers about two thousand square metres. There were workshops here: for painting, joinery, wheel-making, turning, metalwork, casting and drafting. Weapons and entrenching tools were made and repaired here — spades, picks, everything used to dig trenches. Ramps were built so that carts could go up to the second floor.

In Soviet times the training workshops of the aviation school were here. And after 1993 the building stood empty and decaying for almost thirty years.

In 2019 to 2021 the west wing was restored. Now it is a centre for technology and industrial design — with exhibits you are allowed to touch.

The Alexander Gate is very close. Walk towards the rampart.`
      }
    },
    {
      n: 11, id: 'aleksandra', title: 'Александровские ворота', caption: 'Северо-восток крепости · ворота Лачплесиса · казармы Земгальской дивизии',
      pos: [55.886763, 26.500418], // примерно, по OSM (20.11.2026)
      spot: 's095', group: 'Александровские ворота', audio: { ru: 'audio/ru/11.mp3', en: 'audio/en/11.mp3', lv: 'audio/lv/11.mp3' },
      text: `Эти ворота названы в честь самого императора Александра Первого, при котором начали строить крепость.

Первые проекты ворот Штауберт сделал в 1816 году, проект именно этих ворот — в 1822-м, а фасад закончили только в 1831-м. Перед воротами тоже стояли деревянные мосты, целых три. Латвийская армия разобрала их в двадцатых годах, последний мост снесли в августе 1926 года, а брёвна пустили на дрова. Створки ворот не сохранились.

В латвийское время вокруг этих ворот жили солдаты. С 1920 по 1940 год в крепости стояла 4-я Земгальская дивизия латвийской армии: три пехотных полка — Айзпутский, Добельский и Бауский — и артиллерийский полк. Каждый полк получил от своего города знамя с девизом. В казармах жили, учились и готовились к войне тысячи молодых латышей. В 1925 году крепость посетил первый президент Латвии Янис Чаксте.

В 1940 году пришла Красная армия, латвийские полки расформировали. Многих офицеров потом арестовали и выслали.

Отсюда идите на запад, вдоль северной части крепости, к Константиновским воротам. Это самый длинный переход — минут десять. По дороге посмотрите на казармы и дома офицеров: многим из них почти двести лет.`,
      texts: {
        lv: `Šie vārti nosaukti paša imperatora Aleksandra Pirmā vārdā, kura laikā sāka celt cietoksni.

Pirmos vārtu projektus Štauberts izstrādāja 1816. gadā, tieši šo vārtu projektu — 1822. gadā, bet fasādi pabeidza tikai 1831. gadā. Arī šo vārtu priekšā stāvēja koka tilti, veseli trīs. Latvijas armija tos izjauca divdesmitajos gados, pēdējo tiltu nojauca 1926. gada augustā, bet baļķus izmantoja malkai. Vārtu vērtnes nav saglabājušās.

Latvijas laikā ap šiem vārtiem dzīvoja karavīri. No 1920. līdz 1940. gadam cietoksnī atradās Latvijas armijas 4. Zemgales divīzija: trīs kājnieku pulki — Aizputes, Dobeles un Bauskas — un artilērijas pulks. Katrs pulks no savas pilsētas saņēma karogu ar devīzi. Kazarmās dzīvoja, mācījās un gatavojās karam tūkstošiem jaunu latviešu. 1925. gadā cietoksni apmeklēja pirmais Latvijas Valsts prezidents Jānis Čakste.

1940. gadā ienāca Sarkanā armija, Latvijas pulkus likvidēja. Daudzus virsniekus vēlāk arestēja un izsūtīja.

No šejienes ejiet uz rietumiem gar cietokšņa ziemeļu daļu, pie Konstantīna vārtiem. Tas ir garākais pārgājiens — ap desmit minūtēm. Pa ceļam apskatiet kazarmas un virsnieku mājas: daudzām no tām ir gandrīz divsimt gadu.`,
        en: `This gate is named after Emperor Alexander the First himself, in whose reign the building of the fortress began.

Staubert made the first gate designs in 1816 and the design of this particular gate in 1822, but the facade was finished only in 1831. In front of this gate too there were wooden bridges — three of them. The Latvian army took them down in the 1920s; the last bridge was demolished in August 1926, and the logs were used for firewood. The leaves of the gate have not survived.

In the Latvian period soldiers lived around this gate. From 1920 to 1940 the 4th Zemgale Division of the Latvian army was stationed in the fortress: three infantry regiments — the Aizpute, Dobele and Bauska regiments — and an artillery regiment. Each regiment received a banner with a motto from its town. Thousands of young Latvians lived, studied and trained for war in these barracks. In 1925 the fortress was visited by Latvia's first president, Jānis Čakste.

In 1940 the Red Army came, and the Latvian regiments were disbanded. Many officers were later arrested and deported.

From here walk west, along the northern part of the fortress, to the Constantine Gate. This is the longest stretch — about ten minutes. On the way, look at the barracks and officers' houses: many of them are almost two hundred years old.`
      }
    },
    {
      n: 12, id: 'konstantina', title: 'Константиновские ворота и главный вал', caption: 'Северо-запад · от ворот остались две стены · бастионы и казематы',
      pos: [55.888177, 26.490655], // примерно, по OSM (20.11.2026)
      spot: 's132', group: 'Константиновские ворота', audio: { ru: 'audio/ru/12.mp3', en: 'audio/en/12.mp3', lv: 'audio/lv/12.mp3' },
      text: `От этих ворот остались только две доломитовые стены. А ведь когда-то их называли самыми красивыми в крепости.

Константиновские ворота построили в 1821–1824 годах. Они вели к летнему госпиталю и на Рижскую дорогу. Именно здесь, на валу у этих ворот, 31 мая 1851 года император Николай Первый сказал: «Динабургская крепость строится при мне уже тридцать один год. Я желал бы, чтобы она была окончена при моей жизни. Но вряд ли я доживу до этого». Он не дожил. А в мае 1917 года, во время революции, у этих ворот выступал перед солдатами военный министр Керенский. В 1962 году своды ворот разобрали: военному училищу нужно было завозить крупную технику.

Теперь посмотрите на вал. Главный вал крепости тянется почти на три километра, высотой до тринадцати метров. В нём восемь бастионов. Снаружи вал одет в гранит — эту каменную стену называют эскарпом. Её строили восемь лет, а в ноябре 1820 года испытали: три тяжёлые пушки сделали четырнадцать выстрелов в одну точку. Стена выдержала, повреждения были только снаружи.

Внутри вала — казематы с кирпичными сводами и потерны, проходы сквозь вал. Вот это и есть настоящие подземелья крепости. Отсюда растут все легенды: о тоннеле под Даугавой, по которому будто бы можно было проехать на тройке, о шести тоннах золота, о Янтарной комнате. Документы говорят другое. Казну в 1812 году вывезли ещё до боёв, а закопанные пушки выкопали. Янтарная комната пропала в Кёнигсберге. А вместо тоннеля под рекой был наплавной мост, который разбирали каждую осень.

Теперь спускайтесь вдоль вала на юг, к реке. Метров через четыреста, у вала, ищите старый спиленный пень и тропинку. Это место связано с поэтом Райнисом.`,
      texts: {
        lv: `No šiem vārtiem palikušas tikai divas dolomīta sienas. Bet kādreiz tos sauca par skaistākajiem cietoksnī.

Konstantīna vārtus uzcēla 1821.–1824. gadā. Tie veda uz vasaras hospitāli un uz Rīgas ceļu. Tieši šeit, uz vaļņa pie šiem vārtiem, 1851. gada 31. maijā imperators Nikolajs Pirmais teica: «Dinaburgas cietoksni būvē manā laikā jau trīsdesmit vienu gadu. Es vēlētos, lai to pabeigtu manas dzīves laikā. Bet diez vai es to sagaidīšu.» Viņš to nesagaidīja. Bet 1917. gada maijā, revolūcijas laikā, pie šiem vārtiem karavīru priekšā uzstājās kara ministrs Kerenskis. 1962. gadā vārtu velves nojauca: kara skolai vajadzēja ievest lielu tehniku.

Tagad paskatieties uz valni. Cietokšņa galvenais valnis stiepjas gandrīz trīs kilometrus, līdz trīspadsmit metriem augsts. Tajā ir astoņi bastioni. No ārpuses valnis ietērpts granītā — šo akmens sienu sauc par eskarpu. To būvēja astoņus gadus, bet 1820. gada novembrī pārbaudīja: trīs smagie lielgabali izdarīja četrpadsmit šāvienus vienā punktā. Siena izturēja, bojājumi bija tikai virspusē.

Vaļņa iekšpusē ir kazemātas ar ķieģeļu velvēm un poternas — ejas cauri valnim. Tās arī ir cietokšņa īstās pazemes. No šejienes aug visas leģendas: par tuneli zem Daugavas, pa kuru it kā varēja izbraukt ar trijjūgu, par sešām tonnām zelta, par Dzintara istabu. Dokumenti saka ko citu. Kasi 1812. gadā aizveda vēl pirms kaujām, bet ieraktos lielgabalus izraka. Dzintara istaba pazuda Kēnigsbergā. Bet tuneļa zem upes vietā bija pontonu tilts, ko katru rudeni izjauca.

Tagad dodieties gar valni uz dienvidiem, uz upes pusi. Pēc kādiem četrsimt metriem pie vaļņa meklējiet vecu nozāģētu celmu un taciņu. Šī vieta saistīta ar dzejnieku Raini.`,
        en: `Only two dolomite walls remain of this gate. And yet it was once called the most beautiful in the fortress.

The Constantine Gate was built in 1821 to 1824. It led to the summer hospital and the road to Riga. It was right here, on the rampart by this gate, that on 31 May 1851 Emperor Nicholas the First said: "The Dinaburg fortress has been under construction in my time for thirty-one years already. I would wish it finished in my lifetime. But I hardly think I shall live to see it." He did not. And in May 1917, during the revolution, War Minister Kerensky addressed the soldiers at this gate. In 1962 the vaults of the gate were taken down: the military school needed to bring in large vehicles.

Now look at the rampart. The main rampart of the fortress runs for almost three kilometres and is up to thirteen metres high. It has eight bastions. On the outside the rampart is clad in granite — this stone wall is called the escarp. It took eight years to build, and in November 1820 it was tested: three heavy guns fired fourteen shots at one spot. The wall held; the damage was only on the surface.

Inside the rampart are casemates with brick vaults and posterns, passages through the rampart. These are the real underground spaces of the fortress. All the legends grow from here: about a tunnel under the Daugava that you could supposedly drive through in a troika, about six tonnes of gold, about the Amber Room. The documents say otherwise. The treasury was taken away in 1812 before the fighting, and the buried cannons were dug up. The Amber Room disappeared in Königsberg. And instead of a tunnel under the river there was a pontoon bridge that was taken apart every autumn.

Now go down along the rampart to the south, towards the river. After about four hundred metres, by the rampart, look for an old sawn-off stump and a path. This place is connected with the poet Rainis.`
      }
    },
    {
      n: 13, id: 'rainis', title: 'Место, где отдыхал Райнис', caption: 'У вала над Даугавой · пень старого дерева · 9 апреля 1920 года',
      pos: [55.8840639, 26.4915746], // примерно, по OSM (20.11.2026)
      spot: 's581', group: 'Другое', audio: { ru: 'audio/ru/13.mp3', en: 'audio/en/13.mp3', lv: 'audio/lv/13.mp3' },
      text: `Эта точка — самая молодая на нашем маршруте. Её нашли совсем недавно.

9 апреля 1920 года в Даугавпилс приехали поэт Янис Райнис и поэтесса Аспазия. Четырнадцать лет они прожили в эмиграции, в Швейцарии, и теперь возвращались в свободную Латвию. Город встречал их торжественно. Днём они гуляли по крепости, а вечером уехали в Ригу, где их ждали тысячи людей.

Фотограф Вилис Ридзениекс снял Райниса отдыхающим под старым деревом у вала. Сто с лишним лет никто не знал, где именно это было. А в ноябре 2026 года житель крепости Дайнис Миглан сверил старый снимок с местностью — вдали тот же стальной мост через Даугаву — и нашёл это место. От дерева остался только спиленный пень. А вдоль вала и сейчас вьётся тропинка. Возможно, по ней ходили и сто лет назад.

Детство Райниса тоже связано с этими краями: недалеко от Даугавпилса, в Беркенеле, стоит дом, где жила его семья, — сегодня это памятное место. Так что для него эта прогулка была почти возвращением домой.

Отсюда идите вдоль реки на восток, обратно к Николаевским воротам. А если вы начинали у Михайловских ворот — пройдите дальше, через арсенал, туда, откуда пришли. И включите финальный рассказ.`,
      texts: {
        lv: `Šī pietura ir jaunākā mūsu maršrutā. To atrada pavisam nesen.

1920. gada 9. aprīlī Daugavpilī ieradās dzejnieks Rainis un dzejniece Aspazija. Četrpadsmit gadus viņi bija nodzīvojuši trimdā Šveicē un tagad atgriezās brīvajā Latvijā. Pilsēta viņus sagaidīja svinīgi. Dienā viņi pastaigājās pa cietoksni, bet vakarā aizbrauca uz Rīgu, kur viņus gaidīja tūkstošiem cilvēku.

Fotogrāfs Vilis Ridzenieks nofotografēja Raini atpūšamies zem veca koka pie vaļņa. Vairāk nekā simt gadu neviens nezināja, kur tieši tas bija. Bet 2026. gada novembrī cietokšņa iedzīvotājs Dainis Miglāns salīdzināja veco uzņēmumu ar apvidu — tālumā tas pats tērauda tilts pār Daugavu — un atrada šo vietu. No koka palicis tikai nozāģēts celms. Bet gar valni joprojām vijas taciņa. Iespējams, pa to staigāja arī pirms simt gadiem.

Arī Raiņa bērnība saistīta ar šo novadu: netālu no Daugavpils, Berķenelē, stāv māja, kur dzīvoja viņa ģimene, — šodien tā ir piemiņas vieta. Tāpēc viņam šī pastaiga bija gandrīz atgriešanās mājās.

No šejienes ejiet gar upi uz austrumiem, atpakaļ pie Nikolaja vārtiem. Bet, ja sākāt pie Mihaila vārtiem, ejiet tālāk, caur arsenālu, uz turieni, no kurienes atnācāt. Un ieslēdziet noslēguma stāstu.`,
        en: `This stop is the newest on our route. It was found only very recently.

On 9 April 1920 the poet Rainis and the poet Aspazija came to Daugavpils. They had lived in exile in Switzerland for fourteen years and were now returning to a free Latvia. The town welcomed them in ceremony. In the daytime they walked around the fortress, and in the evening they left for Riga, where thousands of people were waiting for them.

The photographer Vilis Ridzenieks photographed Rainis resting under an old tree by the rampart. For more than a hundred years nobody knew exactly where it was. Then in November 2026 a resident of the fortress, Dainis Miglāns, compared the old photograph with the landscape — in the distance is the same steel bridge over the Daugava — and found the spot. All that remains of the tree is a sawn-off stump. But a path still winds along the rampart. Perhaps people walked along it a hundred years ago too.

Rainis's childhood is also connected with this region: not far from Daugavpils, at Berķenele, stands the house where his family lived — today it is a memorial site. So for him this walk was almost a homecoming.

From here walk east along the river, back to the Nicholas Gate. And if you started at the Michael Gate, go on through the arsenal to where you came from. Then play the final story.`
      }
    }
  ],
  outro: {
    n: 14, title: 'Финал', caption: 'Двести лет за одну прогулку',
    audio: { ru: 'audio/ru/14.mp3', en: 'audio/en/14.mp3', lv: 'audio/lv/14.mp3' },
    text: `Вы прошли крепость по кругу. Давайте вспомним, что вы увидели.

Её начали строить в 1810 году против Наполеона. В 1812-м недостроенное мостовое укрепление отбило атаки французов. Потом почти семьдесят лет шла стройка: гранитные валы, казармы, арсеналы, четверо ворот. Чтобы защитить город от наводнений, инженер Павел Мельников построил вдоль Даугавы дамбу — по ней проходит сегодняшняя улица 18 Ноября. Дамба выдержала даже самое большое наводнение в истории города, в апреле 1922 года, когда вода поднялась больше чем на десять метров.

Настоящей долгой осады крепость так и не узнала — и, может быть, поэтому дошла до нас почти целой. За годы Первой мировой войны и войн за независимость здесь сменились пять гарнизонов. Двадцать лет здесь жили солдаты латвийской армии. Война принесла сюда лагерь военнопленных и гетто — об этом здесь помнят. Почти полвека крепость была закрытым военным городком. А потом её почти бросили, и здания начали разрушаться.

Сегодня крепость оживает. Открылись центр Ротко, Дом Мартинсона, Николаевские ворота, центр техники, обновился сад. Но многие дома ещё ждут своей очереди.

Спасибо, что прошли этот путь. Если захотите вернуться — в приложении «Dinaburga 1810» вас ждут сотни старых снимков. Найдите место любого из них и сделайте свой кадр. Так вы сами станете частью истории крепости.`,
      texts: {
        lv: `Jūs esat apgājuši cietoksni pa apli. Atcerēsimies, ko jūs redzējāt.

To sāka celt 1810. gadā pret Napoleonu. 1812. gadā nepabeigtais tilta nocietinājums atsita francūžu uzbrukumus. Pēc tam gandrīz septiņdesmit gadu ilga būvniecība: granīta vaļņi, kazarmas, arsenāli, četri vārti. Lai pasargātu pilsētu no plūdiem, inženieris Pāvels Meļņikovs gar Daugavu uzcēla dambi — pa to iet tagadējā 18. Novembra iela. Dambis izturēja pat lielākos plūdus pilsētas vēsturē, 1922. gada aprīlī, kad ūdens pacēlās vairāk nekā par desmit metriem.

Īstu ilgu aplenkumu cietoksnis tā arī nepiedzīvoja — un varbūt tāpēc tas ir saglabājies gandrīz vesels. Pirmā pasaules kara un neatkarības karu gados šeit nomainījās pieci garnizoni. Divdesmit gadus šeit dzīvoja Latvijas armijas karavīri. Karš atnesa šurp karagūstekņu nometni un geto — par to šeit atceras. Gandrīz pusgadsimtu cietoksnis bija slēgta kara pilsētiņa. Bet pēc tam to gandrīz pameta, un ēkas sāka brukt.

Šodien cietoksnis atdzīvojas. Atvērti Rotko centrs, Mārtiņsona nams, Nikolaja vārti, tehnikas centrs, atjaunots dārzs. Bet daudzi nami vēl gaida savu kārtu.

Paldies, ka izgājāt šo ceļu. Ja gribēsiet atgriezties — lietotnē «Dinaburga 1810» jūs gaida simtiem vecu uzņēmumu. Atrodiet jebkura no tiem vietu un uzņemiet savu kadru. Tā jūs paši kļūsiet par daļu no cietokšņa vēstures.`,
        en: `You have walked all the way round the fortress. Let us recall what you have seen.

It was begun in 1810 against Napoleon. In 1812 the unfinished bridgehead beat off the French attacks. Then construction went on for almost seventy years: granite ramparts, barracks, arsenals, four gates. To protect the town from floods, the engineer Pavel Melnikov built a dam along the Daugava — today's 18 Novembra Street runs along it. The dam withstood even the biggest flood in the town's history, in April 1922, when the water rose by more than ten metres.

The fortress never experienced a real long siege — and perhaps that is why it has come down to us almost intact. During the First World War and the wars of independence, five garrisons changed here. For twenty years soldiers of the Latvian army lived here. The war brought a prisoner-of-war camp and a ghetto — they are remembered here. For almost half a century the fortress was a closed military town. Then it was almost abandoned, and the buildings began to decay.

Today the fortress is coming back to life. The Rothko Centre, the Martinsons House, the Nicholas Gate and the technology centre have opened, and the garden has been renewed. But many buildings are still waiting their turn.

Thank you for walking this route. If you want to come back, hundreds of old photographs await you in the "Dinaburga 1810" app. Find the spot where any of them was taken and take your own picture. That way you yourself become part of the fortress's history.`
      }
  }
};
