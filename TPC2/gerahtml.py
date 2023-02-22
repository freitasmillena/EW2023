import json
import os

def ordCidade(cidade):
    return cidade['nome']

f = open("mapa.json")
mapa = json.load(f)
cidades = mapa['cidades']
cidades.sort(key=ordCidade)
locations = mapa['ligações']

mapCidades = {}

mapLocations = {}

for c in cidades:
    mapCidades[c['id']] = c['nome']

for l in locations:
    if l['origem'] not in mapLocations:
        mapLocations[l['origem']] = []
    mapLocations[l['origem']].append(l)

  
print(cidades)



pagHTML = """
<!DOCTYPE html>
<html>
    <head>
        <title>Mapa Virtual</title>
        <meta charset="UTF-8"/>
    </head>
    <body>
        <h1>Mapa Virtual</h1>
            <!--Índice-->
            <a name="indice"/>
            <h3>Cidades</h3>
             <ol>
"""

for c in cidades:
    pagHTML += f"<li><a href='{c['id']}'>{c['nome']}</a></li>"

pagHTML += """
</ol>
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
                <a name="{c['id']}"/>
                <h1>{c['nome']}</h1>"""               

    cidadeHTML += f"""
                    <p><b>Distrito:</b> {c['distrito']}</p>
                    <p><b>População:</b> {c['população']}</p>
                    <p><b>Descrição:</b> {c['descrição']}</p>
                    """
    if c['id'] in mapLocations:
        cidadeHTML += """<h4>Ligações</h4>"""
        for list in mapLocations[c['id']]:
            cidadeHTML += f""" 
                    <p><a href='{list['destino']}'>{mapCidades[list['destino']]}</a>: {list['distância']}</p>    
            """
                    
                    
                    
    cidadeHTML += """
                    <address>[<a href="/">Voltar ao índice</a>]</address>    
    """
           
    cidadeHTML += """
    </body>
    </html>
    """
    file = open(c['id']+".html", "w")
    file.write(cidadeHTML)
    file.close()




