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

  




pagHTML = """
<!DOCTYPE html>
<html>
    <head>
        <title>Mapa Virtual</title>
        <meta charset="UTF-8"/>
    </head>
    <body>
        <h1>Mapa Virtual</h1>
        <table>
            <tr>
                <!--Índice-->
                <td width="30%" valign="top">
                    <a name="indice"/>
                    <h3>Índice</h3>
                    <ol>
"""




for c in cidades:
    pagHTML += f"<li><a href='#{c['id']}'>{c['nome']}</a></li>"

pagHTML += """
</ol>
                </td>
                 <!--Conteúdo-->
                <td width="70%">
"""

for c in cidades:
    pagHTML += f"""
     <a name="{c['id']}"/>
                    <h3>{c['nome']}</h3>
                    <p><b>Distrito:</b> {c['distrito']}</p>
                    <p><b>População:</b> {c['população']}</p>
                    <p><b>Descrição:</b> {c['descrição']}</p>
                    """
    if c['id'] in mapLocations:
        pagHTML += """<h4>Ligações</h4>"""
        for list in mapLocations[c['id']]:
            pagHTML += f""" 
                    <p><a href='#{list['destino']}'>{mapCidades[list['destino']]}</a>: {list['distância']}</p>    
            """
                    
                    
                    
    pagHTML += """
                    <address>[<a href="#indice">Voltar ao índice</a>]</address>
                    <center>
                        <hr width="80%"/>
                    </center>
    
    """
                
                   



pagHTML += """
                </td>
            </tr>
        </table>
    </body>
</html>
"""



file = open("mapa.html", "w")
file.write(pagHTML)
file.close()

