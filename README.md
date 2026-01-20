## 🚀 About The Project

**NexUI** bridges the gap between complex AI models and user-friendly design. While standard LLM interfaces can be sluggish, NexUI leverages the **Groq API** to deliver responses at speeds that feel instantaneous, wrapped in a beautiful, minimal UI designed with **Tailwind CSS**.

**🚀 Live Demo:** [View the deployed application here](https://nex-ui.netlify.app/)

### Key Features

* ⚡ **Real-time Inference:** Utilizes Groq's LPU (Language Processing Unit) for near-zero latency.
* 🎨 **Adaptive UI:** Responsive design that works flawlessly on Mobile, Tablet, and Desktop.
* 🔒 **Secure Environment:** Client-side API key handling via secure environment variables.
* 🧠 **Context Aware:** Maintains conversation history for fluid interactions.

### 🛠️ Built With

* [![React][React.js]] (https://react.dev/)]
* [![TailwindCSS][TailwindCSS]] (https://tailwindcss.com/)]
* [![Groq][Groq-Badge]] (https://console.groq.com/keys)

---

## ⚡ Getting Started

Follow these simple steps to get a local copy up and running.

### Prerequisites

* **Node.js** (v14.0.0 or later)
* **npm**
    ```sh
    npm install npm@latest -g
    ```

### Installation

1.  **Clone the repository**
    ```sh
    git clone [https://github.com/sarthak2436/nexui.git](https://github.com/sarthak2436/nexui.git)
    ```
2.  **Navigate to the project directory**
    ```sh
    cd nexui
    ```
3.  **Install NPM packages**
    ```sh
    npm install
    ```
4.  **Set up your API Key**
    * Get a free API Key at [https://console.groq.com/](https://console.groq.com/)
    * Create a `.env` file in the root directory.
    * Add your key (Important: Must use `REACT_APP_` prefix):
    ```env
    REACT_APP_GROQ_API_KEY=gsk_your_actual_api_key_here
    ```

5.  **Start the application**
    ```sh
    npm start
    ```
