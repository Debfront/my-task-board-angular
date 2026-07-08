<h1 align="center">
   📝 Meu Quadro de Tarefas (Task Board)
</h1>

<p align="center">
  <img src="https://img.shields.io/badge/Angular-19-DD0031?style=for-the-badge&logo=angular&logoColor=white" alt="Angular 19">
  <img src="https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS">
  <img src="https://img.shields.io/badge/Material_Design-v19-0081CB?style=for-the-badge&logo=angular-material&logoColor=white" alt="Angular Material">
</p>

## 📌 Sobre o Projeto

Este repositório foi criado para documentar, praticar e consolidar os meus estudos no ecossistema **Angular 19**. Utilizando como ponto de partida o template base do canal *Descomplicando a Prática*, reconstruí toda a arquitetura lógica do To-Do Application para entender a fundo o fluxo e gerenciamento de dados no Front-end.

O grande objetivo deste projeto foi ir além de apenas "criar telas", focando em **separação de responsabilidades**, criação de serviços reativos e manipulação imutável de estados.

---

## 🧠 Conceitos Praticados & Aprendizados

Durante o desenvolvimento das funcionalidades de listagem, criação, atualização (check) e deleção de tarefas, apliquei conceitos fundamentais de engenharia de software no ecossistema moderno do Angular:

* **Arquitetura em Camadas (Service vs Component):** Aprendi a isolar as regras de negócio e o estado da aplicação em um **Serviço Centralizado (Chef de Cozinha)**, deixando os componentes como meros **repassadores de eventos (Garçons)**.
* **Angular Signals (Reatividade Moderna):** Utilização de `signal()` para gerenciar o estado das tarefas de forma síncrona na memória, eliminando a complexidade desnecessária e aplicando `computed()` para contadores dinâmicos.
* **Manipulação de Arrays com JavaScript:** Consolidação prática de métodos imutáveis:
  * `.filter()` para deletar itens e filtrar por categorias, garantindo a redução precisa da lista.
  * `.map()` para alternar o status de conclusão das tarefas sem quebrar a estrutura do array.
* **Two-Way Data Binding (`[(ngModel)]`):** Aplicação prática do conceito de "Lousa Mágica" para sincronização automática de formulários em tempo real com o TypeScript.
* **Estilos Dinâmicos:** Renderização de tags de categorias utilizando injeção dinâmica de propriedades CSS (`[style.background-color]`).
* **Consumo de APIs com HttpClient:** Compreensão de requisições assíncronas assentes na arquitetura do Angular.

---

## ✨ Tecnologias Utilizadas

- **[Angular 19](https://angular.dev/)** — Framework base focado em componentes standalone.
- **[Tailwind CSS](https://tailwindcss.com/)** — Para estilização ágil e utilitária da interface.
- **[Angular Material](https://material.angular.io/)** — Componentes visuais de design como o `mat-divider`.

---

## 📑 Demonstração do App
![Login](public/app_demo.gif 'Demo')

---

## 🚀 Como Rodar o Meu Projeto Localmente

```bash
# 1. Clone o repositório para a sua máquina
$ git clone [https://github.com/Debfront/my-task-board-angular.git](https://github.com/Debfront/my-task-board-angular.git)

# 2. Acesse a pasta do projeto
$ cd my-task-board-angular

# 3. Instale as dependências necessárias
$ npm install

# 4. Certifique-se de iniciar o seu servidor backend/mock local (ex: porta 3000)
# $ npm run server

# 5. Inicie o servidor de desenvolvimento do Angular
$ npm start