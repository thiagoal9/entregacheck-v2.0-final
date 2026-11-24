# EntregaCHECK

Site de logística para lojas que fazem entregas (tecnologia, colchões, carros e casas). Projeto final da disciplina de Desenvolvimento de Interfaces.

**Versão atual: v2.0**


## Sobre o projeto

O EntregaCHECK mostra como uma plataforma de logística poderia funcionar para lojas de vários ramos. O usuário pesquisa lojas parceiras por categoria, rastreia pedidos, simula o frete e fala com a equipe pelo formulário de contato.

## O que tem no site

- Cartões das lojas parceiras
- Abas por categoria + barra de pesquisa (funcionam juntas)
- Cartões explicativos ("Como funciona")
- Carrossel de imagens com botão de pausar
- Formulário de contato com validação
- Página de login (simulada)
- **Rastreio de pedido** com linha do tempo (v2)
- **Cotação de frete** com valor e prazo estimados (v2)
- Modo claro/escuro e ajuste do tamanho da fonte
- Rodapé

> Rastreio, cotação e login são simulações feitas em JavaScript, com dados de exemplo. Não há servidor nem banco de dados.

## Tecnologias

- HTML5
- CSS3 (variáveis CSS para os temas)
- JavaScript puro
- Fontes: Oswald e Source Sans 3 (Google Fonts)

## Estrutura de pastas

```
index.html
login.html
rastreio.html
cotacao.html
style.css
script.js
img/
  carros.svg
  casas.svg
  colchoes.svg
  tecnologia.svg
```

## Paleta de cores

| Cor | Código | Uso |
|---|---|---|
| Cinza escuro | `#2b2d31` | cabeçalho, rodapé, destaque |
| Cinza quase preto | `#1f2023` | textos e botões |
| Amarelo | `#FFC400` | botões, detalhes e destaques |

## Como rodar

1. Baixe ou clone o repositório
2. Abra o `index.html` no navegador (ou use a extensão Live Server do VS Code)

Para testar o rastreio, use os códigos `EC100001`, `EC100002` e `EC100003`.

## Acessibilidade

- Link "pular para o conteúdo"
- Foco visível nos elementos
- Labels em todos os campos
- Textos alternativos nas imagens
- Contraste verificado pelo WebAIM Contrast Checker
- Animações respeitam `prefers-reduced-motion`

## Versões

- **v1.0**: versão inicial com todas as seções e a página de login
- **v2.0**: páginas de rastreio de pedido e cotação de frete

## Autor

Thiago Assis Lopes
