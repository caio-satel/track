# ⏰ TrackHours - Frontend (Angular)

O **TrackHours** é a interface web desenvolvida com **Angular** para o sistema de gestão de horas trabalhadas. A aplicação permite o registro e visualização das horas trabalhadas por projeto e atividades gerando gráficos e relatórios para facilitar o acompanhamento das atividades dos usuários. Controle total da aplicação por parte dos administradores e usuário tem acesso restrito à dashboard.

Este frontend faz parte do sistema TrackHours e depende do backend desenvolvido com Spring Boot.
Para obter o backend da aplicação, acesse o repositório correspondente:

[Backend Trackhours](https://github.com/caio-satel/trackhours)

Certifique-se de rodar o backend antes de iniciar o frontend para que todas as funcionalidades estejam disponíveis.
--

## 🚀 **Funcionalidades**

- Registro de horas trabalhadas vinculadas a atividades e projetos.
- Visualização de gráficos com horas totais por projeto, atividades ou usuários.
- Dashboard dinâmica com informações gerais de projetos e atividades do usuário.
- Autenticação e controle de acesso utilizando **Token JWT**.
- Interface amigável e responsiva.

--

## 🛠️ **Tecnologias Utilizadas**

- **Angular 17** - Framework principal, utilizando Angular Material para componentes UI.
- **Chart.js** - Exibição de gráficos dinâmicos.
- **HTML5 e CSS3** - Interface de usuário.
- **TypeScript** - Desenvolvimento com tipagem estática.

--

## 📂 **Estrutura do Projeto**

```
src/
├── app/
│   ├── DTO/              # Objetos de Transferência de Dados
│   ├── environments/     # Configurações de ambiente
│   ├── guards/           # Guardas de rotas
│   ├── interceptor/      # Interceptadores de requisições
│   ├── models/           # Modelos de dados
│   ├── modules/          # Módulos específicos da aplicação
│   ├── services/         # Serviços para comunicação com o backend
│   └── shared/           # Componentes e funcionalidades compartilhadas
└── assets/               # Recursos estáticos (imagens, estilos)
```

---

## 📝 **Pré-requisitos**

- **Node.js 20** e **npm 10** instalados.
- **Angular CLI** para rodar o projeto.

--

## 💻 **Instalação e Execução**

1. Clone o repositório:
   ```bash
   git clone https://github.com/caio-satel/track.git
   cd track
   ```
2. Instale as dependências:
   ```bash
   npm install
   ```
3. Execute o servidor:
   ```bash
   ng serve
   ```
4. Acesse a aplicação:
   ```
   http://localhost:4200
   ```

--

### Aproveita a aplicação

