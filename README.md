# Portfólio · Alexandre Guimarães (PT-BR / EN)

Site estático, sem build. Abre em **português** por padrão; o botão PT/EN no topo troca o idioma
(a escolha fica salva no navegador; `?lang=en` força o inglês).

## Publicar no GitHub Pages

1. No repositório do portfólio (ex.: `ascguimaraes.github.io`, pasta/repositório `portfolio`),
   coloque o conteúdo desta pasta na raiz: `index.html`, `assets/`, `.nojekyll`.
2. Faça commit e push na branch `main`.
3. Em **Settings → Pages**, escolha *Deploy from a branch* → `main` → `/ (root)`.
4. Endereço esperado: https://ascguimaraes.github.io/portfolio/

## Estrutura

- `index.html`: conteúdo (cada texto tem `lang="pt"` e `lang="en"`)
- `assets/style.css`: cores e fontes (Playfair Display + DM Sans, paleta do portfólio antigo)
- `assets/main.js`: idioma, abas, filtro de cases, carrossel de recomendações
- `assets/alexandre-portfolio.jpg` e `assets/alexandre-linkedin.jpg`: fotos

## Editar textos

Procure o par `<span lang="pt">…</span><span lang="en">…</span>` e altere os dois.
Para trocar as fotos, substitua os arquivos em `assets/` mantendo os nomes.
