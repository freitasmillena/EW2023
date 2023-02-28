import json
import locale

locale.setlocale(locale.LC_ALL,"")

def ordCidade(cidade):
    return locale.strxfrm(cidade['nome'])


f = open("mapa.json")
mapa = json.load(f)
cidades = mapa['cidades']
cidades.sort(key=ordCidade)
#print(cidades)
locations = mapa['ligações']
distritos = {} #chave - distrito, valor - id da cidade
mapCidades = {}



mapLocations = {}

for c in cidades:
    mapCidades[c['id']] = c
    if c['distrito'] not in distritos:
        distritos[c['distrito']] = []
    distritos[c['distrito']].append(c['id'])

for l in locations:
    if l['origem'] not in mapLocations:
        mapLocations[l['origem']] = []
    mapLocations[l['origem']].append(l)

distritoslist = list(distritos.keys())
distritoslist.sort(key=locale.strxfrm)


pagHTML = """
<!DOCTYPE html>
<html>
    <head>
        <title>Mapa Virtual</title>
        <meta charset="UTF-8"/>
    </head>
    <body>
        <div class="card">
        <h1>Mapa Virtual</h1>
            <!--Índice-->
            <hr class="line">
            <div class="nav">
                <p><a href="#Aveiro">Aveiro</a></p><p><a href="#Beja">Beja</a></p><p><a href="#Braga">Braga</a></p><p><a href="#Bragança">Bragança</a></p><p><a href="#Castelo Branco">Castelo Branco</a></p><p><a href="#Coimbra">Coimbra</a></p><p><a href="#Évora">Évora</a></p><p><a href="#Faro">Faro</a></p><p><a href="#Guarda">Guarda</a></p><p><a href="#Leiria">Leiria</a></p>
            </div>
            <div class="nav last">
                <p><a href="#Lisboa">Lisboa</a></p><p><a href="#Portalegre">Portalegre</a></p><p><a href="#Porto">Porto</a></p><p><a href="#Santarém">Santarém</a></p><p><a href="#Setúbal">Setúbal</a></p><p><a href="#VianadoCastelo">Viana do Castelo</a></p><p><a href="#VilaReal">Vila Real</a></p><p><a href="#Viseu">Viseu</a></p>
            </div>
             
"""


for d in distritoslist:
    pagHTML += f"""
    <a name={d.replace(" ", "")}></a> 
    <h2><b>{d}</b></h2>
    <hr class="line_smaller">
    """
    for c in distritos[d]:
        dados = mapCidades[c]
        pagHTML += f"<li><a href='{dados['id']}'>{dados['nome']}</a></li>"

pagHTML += """
</ol>
</div>
</body>
</html>"""

file = open("index.html", "w")
file.write(pagHTML)
file.close()

for c in cidades:
    cidadeHTML = f"""
    <!DOCTYPE html>
        <html>
            <head>
            <title>{c['nome']}</title>
            <meta charset="UTF-8"/>
            </head>
            <body>
                <div class="card">
                <a name="{c['id']}"></a>
                <h1>{c['nome']}</h1>
                <hr class="line">
                <div class="nav">
                    <p><a href="#Distrito">Distrito</a></p><p><a href="#Pop">População</a></p><p><a href="#Desc">Descrição</a></p><p><a href="#Lig">Ligações</a></p>
                </div>
                """               

    cidadeHTML += f"""
                    <a name="Distrito"></a>
                    <h2><b>Distrito</b></h2>
                    <hr class="line_smaller">
                    <p>{c['distrito']}</p>
                    
                    <a name="Pop"></a>
                    <h2><b>População</b></h2> 
                    <hr class="line_smaller">
                    <p>{c['população']}</p>
                    
                    <a name="Desc"></a>
                    <h2><b>Descrição</b></h2>
                    <hr class="line_smaller">
                    <p>{c['descrição']}</p>
                    """
    if c['id'] in mapLocations:
        cidadeHTML += """
                    <a name="Lig"></a>
                    <h2>Ligações</h2> 
                    <hr class="line_smaller">"""
        for list in mapLocations[c['id']]:
            cidadeHTML += f""" 
                    <p><a href='{list['destino']}'>{mapCidades[list['destino']]['nome']}</a>: {list['distância']}</p>    
            """
                    
                    
                    
    cidadeHTML += """
                    <hr class="line_last">
                    <address>[<a href="/">Voltar ao índice</a>]</address>    
                </div>
        </body>
    </html>
    """
    file = open("./cidades/"+c['id']+".html", "w")
    file.write(cidadeHTML)
    file.close()
