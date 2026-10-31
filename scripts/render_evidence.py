from pathlib import Path
from html.parser import HTMLParser
from html import escape
import json
root=Path(__file__).resolve().parents[1]
translations=json.loads((root/'scripts/evidence-translations.json').read_text())
class Translate(HTMLParser):
 def __init__(self):super().__init__(convert_charrefs=False);self.out=[]
 def handle_decl(self,d):self.out.append('<!'+d+'>')
 def handle_starttag(self,tag,attrs):
  parts=[]
  for k,v in attrs:
   if v is not None:
    v=translations.get(v,v)
    if k=='lang':v='en'
    if k=='href' and v.startswith(('index.html','evidence.html')):v=v.replace('.html','.en.html',1)
   parts.append(k if v is None else k+'="'+escape(v,quote=True)+'"')
  self.out.append('<'+tag+(' '+' '.join(parts) if parts else '')+'>')
 def handle_endtag(self,tag):self.out.append('</'+tag+'>')
 def handle_data(self,data):self.out.append(escape(translations.get(data,data),quote=False))
 def handle_entityref(self,n):self.out.append('&'+n+';')
 def handle_charref(self,n):self.out.append('&#'+n+';')
 def handle_comment(self,n):self.out.append('<!--'+n+'-->')
s=(root/'evidence.html').read_text()
# Navigation and scripts are inserted after translating the source content.
base=s.split('<!-- locale-controls -->')[0] if '<!-- locale-controls -->' in s else s
# The original Chinese source is stored separately to make builds repeatable.
source=root/'scripts/evidence.zh.html'
if source.exists():base=source.read_text()
else:source.write_text(base)
p=Translate();p.feed(base)
for lang,html in [('zh',base),('en',''.join(p.out))]:
 controls='<div class="language-switch" aria-label="Language">'+''.join('<a href="evidence'+('.en' if l=='en' else '')+'.html?lang='+l+'" data-language="'+l+'" lang="'+l+'"'+(' aria-current="true"' if l==lang else '')+'>'+label+'</a>' for l,label in [('zh','中文'),('en','EN')])+'</div>'
 html=html.replace('<meta name="viewport" content="width=device-width,initial-scale=1">','<meta name="viewport" content="width=device-width,initial-scale=1"><script src="assets/locale.js"></script>')
 html=html.replace('</head>','<link rel="stylesheet" href="assets/refresh.css"><link rel="alternate" hreflang="zh-CN" href="evidence.html?lang=zh"><link rel="alternate" hreflang="en" href="evidence.en.html?lang=en"></head>')
 html=html.replace('<nav>','<nav>'+controls)
 for asset in ('style.css','refresh.css','locale.js'):
  html=html.replace('"assets/'+asset+'"','"assets/'+asset+'?v=20261031-tablet"')
 (root/('evidence.html' if lang=='zh' else 'evidence.en.html')).write_text(html)
print('Rendered both evidence pages')
