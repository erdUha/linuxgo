<template>
	<div>
		<div class="article">
			<input type="checkbox" class="contents-open">
			<div class="contents">
				<h3>Содержание</h3>
				<ul>
					<li><a @click="closeContents" href="#whatis">Что такое Express JS</a></li>
					<li><a @click="closeContents" href="#installation">Установка Express JS</a></li>
					<li><a @click="closeContents" href="#shablon">Механизмы шаблонов Express JS</a></li>
				</ul>
			</div>
			<div class="article-text">
				<h2>Первое приложение на Express JS</h2>
				<h3 id="whatis">Что такое Express JS</h3>
				<p>
				Express JS — это платформа веб-приложений для Node.js. По сути, он находится поверх Node.js и обеспечивает быстрый доступ к функциям и инструментам, необходимым для эффективного создания веб-приложений. Это избавляет вас от необходимости изобретать велосипед, но при этом дает вам свободу выбора формы вашего веб-приложения.
				</p>
				<p>
				Существует множество подобных фреймворков. Что отличает Express JS, так это акцент на минимальной, ненавязчивой, быстрой и гибкой среде. Вы можете использовать Express JS для приложений любого размера и сложности, и он хорошо работает с широким спектром архитектур приложений.
				</p>
				<h3 id="installation">Установка Express JS</h3>
				<p>
				Эти шаги помогут вам настроить базовое приложение Express JS. Он использует генератор приложений Express JS для автоматического создания скелета приложения.
				</p>
				<p>
				Если вы хотите вручную разработать дизайн своего приложения, вы можете следовать руководству по установке Express JS, в котором показано, как создать минимальное приложение Node.js и добавить Express JS в качестве зависимости. Node.js является обязательным условием, поэтому воспользуйтесь одной из ссылок на первом шаге ниже, чтобы получить инструкции по его установке.
				</p>
				<ol>
					<li>
						Сначала вам нужно установить Node.js. Вы можете следовать либо руководству «Как установить Node.js и NGINX» (просто выберите соответствующий дистрибутив Linux из раскрывающегося списка), либо руководству «Как установить и использовать Node Version Manager NVM».
					</li>
					<li>
						Перейдите в каталог, в котором вы хотите разместить свое приложение. Пример приложения в этом руководстве находится в домашнем каталоге текущего пользователя. Затем используйте генератор приложений Express, чтобы создать скелет приложения.
					</li>
					<div class="code">
						cd ~ <br>
						npx express-generator --view=pug example-app
					</div>
					<p>
					В этом руководстве используется шаблонизатор Pug, который, как правило, используется чаще всего. Однако с Express JS вы можете выбирать из множества шаблонизаторов. Дополнительную информацию о доступных шаблонах и том, как они работают, см. в разделе «Шаблоны Express JS» ниже.
					</p>
					<li>
						Генератор создает каталог example-app в текущем каталоге и добавляет туда все базовые файлы вашего приложения. Перейдите в новый каталог приложения.
						<div class="code">
							cd example-app
						</div>
						Если не указано иное, в оставшейся части этого руководства предполагается, что вы все еще находитесь в каталоге example-app.
					</li>
					<li>
						Установите и скомпилируйте зависимости вашего приложения.
						<div class="code">
							 npm install
						</div>
					</li>
					<li>
						Теперь вы можете запустить приложение с помощью следующей команды.
						<div class="code">
							DEBUG=example-app:* npm start
						</div>
						<ul>
							<li>
								Express JS обслуживает приложение через порт 3000. Чтобы посетить приложение удаленно, откройте порт в брандмауэре вашего сервера и используйте веб-браузер, чтобы перейти к нему. Вот пример использования доменного имени вашего сервера.
								<div class="code">
									example.com:3000
								</div>
							</li>
							<li>
								Альтернативно вы можете использовать IP-адрес вашего сервера.
								<div class="code">
									192.0.2.0:3000
								</div>

							</li>
						</ul>
						Вас должно приветствовать сообщение «Добро пожаловать в Express».
					</li>
				</ol>
				<h3 id="shablon">Механизмы шаблонов Express JS</h3>
				<p>
				Express JS имеет возможность использовать различные механизмы шаблонов. Механизм шаблонов принимает файлы представлений — по сути, шаблоны веб-страниц — и динамически заполняет их информацией.
				</p>
				<p>
				Взгляните на список механизмов шаблонов Express, чтобы увидеть другие механизмы шаблонов, которые Express JS поддерживает «из коробки».
				</p>
				<p>
				Большинство шаблонизаторов используют собственное форматирование шаблонов. Таким образом, механизм шаблонов, который вы используете, по крайней мере частично, зависит от того, в каком формате вы хотите записать файлы шаблонов. Например, механизм шаблонов Pug, используемый в этом руководстве, использует минималистский формат, чувствительный к пробелам, без явных тегов, используемых в HTML. . С другой стороны, механизм встроенного JavaScript (EJS) во многом остается верным форматированию HTML.
				</p>
				<p>
				Приложения Express JS передают информацию представлениям, используя функцию рендеринга объектов ответа. Вы можете увидеть это в базовом приложении, установленном выше. Файл ~/example-app/routes/index.js использует функцию рендеринга для создания представления страницы приветствия для всех пользователей, посещающих базовый URL-адрес (/). При этом он также предоставляет данные для использования в представлении — в данном случае заголовок страницы.
				</p>
				index.js
				<div class="code">
					// [...]<br><br>

var router = express.Router();<br>

router.get('/', function(req, res, next) {<br>
    res.render('index', { title: 'Express' });<br>
});<br><br>

// [...]<br>
				</div>
				<p>
				По умолчанию вы можете найти шаблоны представлений в каталоге «views». В движке Pug индексное представление находится в файле «~/example-app/views/index.pug». Там вы можете увидеть, как шаблон использует данные заголовка(title) для настройки приветственного сообщения.
				</p>
				index.pug
				<div class="code">
					// [...]<br><br>

block content<br>
  h1= title<br>
  p Welcome to #{title}<br>
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped>
.code {
	text-align: left;
	font-family:Consolas,Monaco,Lucida Console,Liberation Mono,DejaVu Sans Mono,Bitstream Vera Sans Mono,Courier New, monospace;
	text-indent: 0;
	background-color: #222;
	border: 2px solid #444;
	border-radius: 0.5rem;
	margin: 1rem 0;
	padding: 2rem;
	z-index: 999;
	color: #fff
}
.contents ul li {
	margin-top: 0.5rem;
}
.contents ul {
	text-align: left;
	list-style: none;
	padding-left: 1.25rem;
	padding-right: 1rem;
}
.contents {
	width: 20rem;
	height: 100%;
	background-color: #222;
}
.article {
	display: flex;
	gap: calc(60vw - 45rem);
}
.article-text h3 {
	text-align: left;
}
.article-text ol {
	text-indent: .5em;
	text-align: left;
	max-width: 60ch;
	margin: 1rem auto;
}
.article-text p {
	text-indent: 1.5em;
	text-align: left;
	max-width: 60ch;
	margin: 1rem auto;
}
.article-text {
	padding: 2rem 2rem;
	padding-top: 4rem;
}
.contents-open {
	display: none;
}
@media (max-width: 48em) {
	.contents-open:checked ~ .contents {
		left: 0;
	}
	.contents-open:checked {
		left: calc(60% + 1rem);
	}
	.contents-open {
		display: block;
		position: absolute;
		width: 2rem; height: 2rem;
		left: 1rem;
		top: 5rem;
	}
	.contents {
		width: 60%;
		position: absolute;
		left: -60%;
	}
}
</style>

<script setup>
import { onMounted } from 'vue'

function closeContents() {
	const contentsOpen = document.getElementsByClassName("contents-open")[0]
	contentsOpen.checked = false;
}

onMounted(() => {
	window.addEventListener('resize', function() {
		const contentsOpen = document.getElementsByClassName("contents-open")[0]
		if (document.body.clientWidth / window.getComputedStyle(document.body).getPropertyValue('font-size').replace(/\D/g, "") > 48) {
			contentsOpen.checked = false;
		}
	})
})
</script>

<script>
export default {
	name: 'FirstNodejs',
}
</script>
