// ================================
// PRODUTOS
// ================================

const products = [

    {
        name: "Geladeira Brastemp 400L",
        price: 3299.90,
        stock: 8,
        info: "Frost Free • 400 litros • 10x sem juros"
    },

    {
        name: "Sofá 3 Lugares Confort",
        price: 1899.90,
        stock: 5,
        info: "Tecido suede • 3 lugares • entrega disponível"
    },

    {
        name: "TV Smart 55” 4K",
        price: 2499.90,
        stock: 12,
        info: "Smart TV • 4K • Wi-Fi • HDMI"
    },

    {
        name: "Guarda-roupa 6 Portas",
        price: 1199.90,
        stock: 4,
        info: "6 portas • 3 gavetas • montagem inclusa"
    }

];


// ================================
// ORÇAMENTO
// ================================

let quote = [];


// ================================
// FORMATAÇÃO DE DINHEIRO
// ================================

const money = value => {

    return value.toLocaleString(
        "pt-BR",
        {
            style: "currency",
            currency: "BRL"
        }
    );

};


// ================================
// TROCAR DE TELA
// ================================

function showSection(id) {

    document
        .querySelectorAll(".section")
        .forEach(section => {

            section.classList.remove("active");

        });


    document
        .getElementById(id)
        .classList.add("active");


    document
        .querySelectorAll(".menu button")
        .forEach(button => {

            button.classList.toggle(
                "active",
                button.dataset.section === id
            );

        });


    if (id === "produtos") {

        renderProducts(
            products,
            "productResults"
        );

    }


    if (id === "inicio") {

        renderProducts(
            products.slice(0, 2),
            "homeResults"
        );

    }

}



// ================================
// MOSTRAR PRODUTOS
// ================================

function renderProducts(list, id) {

    const element =
        document.getElementById(id);


    if (!list.length) {

        element.innerHTML =
            '<p class="muted">Nenhum produto encontrado.</p>';

        return;

    }


    element.innerHTML = list.map(product => `

        <div class="product">

            <strong>
                ${product.name}
            </strong>

            <span class="muted">
                ${product.info}
            </span>

            <div class="price">
                ${money(product.price)}
            </div>

            <span class="stock">
                ${product.stock} unidades em estoque
            </span>


            <div class="actions">

                <button
                    class="btn use-quote"
                    data-name="${product.name}"
                >
                    Usar no orçamento
                </button>


                <button
                    class="btn secondary details"
                    data-name="${product.name}"
                >
                    Detalhes
                </button>

            </div>

        </div>

    `).join("");


    // BOTÃO USAR NO ORÇAMENTO

    element
        .querySelectorAll(".use-quote")
        .forEach(button => {

            button.onclick = () => {

                document
                    .getElementById("quoteProduct")
                    .value = button.dataset.name;


                showSection("orcamento");

            };

        });


    // BOTÃO DETALHES

    element
        .querySelectorAll(".details")
        .forEach(button => {

            button.onclick = () => {

                const product =
                    products.find(
                        item =>
                            item.name === button.dataset.name
                    );


                alert(
                    `Produto: ${product.name}

Preço: ${money(product.price)}

Estoque: ${product.stock}

${product.info}`
                );

            };

        });

}



// ================================
// PESQUISAR PRODUTOS
// ================================

function searchProducts(inputId, resultId) {

    const query =
        document
            .getElementById(inputId)
            .value
            .toLowerCase();


    const result =
        products.filter(product =>

            product.name
                .toLowerCase()
                .includes(query)

            ||

            product.info
                .toLowerCase()
                .includes(query)

        );


    renderProducts(
        result,
        resultId
    );

}



// ================================
// ADICIONAR AO ORÇAMENTO
// ================================

function addQuote() {

    const name =
        document
            .getElementById("quoteProduct")
            .value
            .trim();


    const quantity =
        Number(
            document
                .getElementById("quoteQty")
                .value
        ) || 1;


    const product =
        products.find(item =>

            item.name
                .toLowerCase()
                .includes(name.toLowerCase())

        );


    if (!product) {

        alert(
            "Produto não encontrado. Tente pesquisar pelo nome."
        );

        return;

    }


    quote.push({

        product: product,

        quantity: quantity

    });


    renderQuote();


    document
        .getElementById("quoteProduct")
        .value = "";

}



// ================================
// MOSTRAR ORÇAMENTO
// ================================

function renderQuote() {

    const element =
        document.getElementById("quoteList");


    element.innerHTML =
        quote.map((item, index) => `

            <div class="quote-row">

                <span>
                    ${item.quantity}x
                    ${item.product.name}
                </span>


                <span>

                    ${money(
                        item.product.price *
                        item.quantity
                    )}

                    <button
                        class="btn secondary remove"
                        data-index="${index}"
                    >
                        Remover
                    </button>

                </span>

            </div>

        `).join("");


    // TOTAL

    const total =
        quote.reduce(
            (sum, item) =>

                sum +
                item.product.price *
                item.quantity,

            0
        );


    document
        .getElementById("total")
        .textContent = money(total);


    // REMOVER

    element
        .querySelectorAll(".remove")
        .forEach(button => {

            button.onclick = () => {

                quote.splice(
                    Number(button.dataset.index),
                    1
                );


                renderQuote();

            };

        });

}



// ================================
// OBJEÇÕES
// ================================

const objections = {

    preco:
        "“Entendo. Podemos verificar uma opção que fique mais próxima do seu orçamento ou comparar as condições de pagamento.”",

    pesquisa:
        "“Claro. Posso mostrar as principais diferenças deste produto e as condições que temos para você comparar melhor.”",

    dinheiro:
        "“Podemos verificar uma opção com valor menor ou uma condição de pagamento que fique mais confortável para você.”"

};



// ================================
// MENU
// ================================

document
    .querySelectorAll(".menu button")
    .forEach(button => {

        button.onclick = () => {

            showSection(
                button.dataset.section
            );

        };

    });



// ================================
// ACESSO RÁPIDO
// ================================

document
    .querySelectorAll("[data-go]")
    .forEach(button => {

        button.onclick = () => {

            showSection(
                button.dataset.go
            );

        };

    });



// ================================
// PESQUISA DA PÁGINA INICIAL
// ================================

document
    .getElementById("homeSearchBtn")
    .onclick = () => {

        searchProducts(
            "homeSearch",
            "homeResults"
        );

    };


document
    .getElementById("homeSearch")
    .oninput = () => {

        searchProducts(
            "homeSearch",
            "homeResults"
        );

    };



// ================================
// PESQUISA DE PRODUTOS
// ================================

document
    .getElementById("productSearchBtn")
    .onclick = () => {

        searchProducts(
            "productSearch",
            "productResults"
        );

    };


document
    .getElementById("productSearch")
    .oninput = () => {

        searchProducts(
            "productSearch",
            "productResults"
        );

    };



// ================================
// BOTÃO ADICIONAR ORÇAMENTO
// ================================

document
    .getElementById("addQuoteBtn")
    .onclick = addQuote;



// ================================
// FINALIZAR ORÇAMENTO
// ================================

document
    .getElementById("finishQuoteBtn")
    .onclick = () => {

        if (quote.length) {

            alert(
                "Orçamento criado com sucesso!"
            );

        } else {

            alert(
                "Adicione pelo menos um produto ao orçamento."
            );

        }

    };



// ================================
// TRATAMENTO DE OBJEÇÕES
// ================================

document
    .querySelectorAll(".objection-btn")
    .forEach(button => {

        button.onclick = () => {

            document
                .getElementById("objectionAnswer")
                .innerHTML = `

                    <div class="objection">

                        <b>
                            Sugestão de abordagem:
                        </b>

                        <br>

                        ${objections[
                            button.dataset.type
                        ]}

                    </div>

                `;

        };

    });



// ================================
// WHATSAPP
// ================================

document
    .querySelectorAll(".contact-btn")
    .forEach(button => {

        button.onclick = () => {

            const customer =
                button.closest(".customer");


            const phoneInput =
                customer.querySelector(
                    ".phone-input"
                );


            // Remove espaços, parênteses e traços

            const phone =
                phoneInput.value.replace(
                    /\D/g,
                    ""
                );


            // Verifica o número

            if (phone.length < 10) {

                alert(
                    "Digite um número válido com DDD.\n\nExemplo: 31999998888"
                );

                return;

            }


            // Mensagem automática

            const message =
                `Olá, ${button.dataset.name}! Tudo bem? Estou entrando em contato sobre o orçamento do ${button.dataset.product}. Posso te ajudar com alguma dúvida?`;


            // Abre o WhatsApp

            const whatsappURL =
                `https://wa.me/55${phone}?text=${encodeURIComponent(message)}`;


            window.open(
                whatsappURL,
                "_blank"
            );

        };

    });



// ================================
// TREINAMENTO
// ================================

document
    .getElementById("sendAnswerBtn")
    .onclick = () => {

        const answer =
            document
                .getElementById("answer")
                .value
                .trim();


        if (answer) {

            alert(
                "Resposta enviada!\n\nA simulação ajuda o vendedor a praticar comunicação e tratamento de objeções."
            );

        } else {

            alert(
                "Digite sua resposta antes de enviar."
            );

        }

    };



// ================================
// CARREGAR PRODUTOS INICIAIS
// ================================

renderProducts(
    products.slice(0, 2),
    "homeResults"
);


document
    .getElementById("enviarNovoCliente")
    .addEventListener("click", function () {

        const nome = document
            .getElementById("novoNome")
            .value
            .trim();

        const telefone = document
            .getElementById("novoTelefone")
            .value
            .replace(/\D/g, "");

        const produto = document
            .getElementById("novoProduto")
            .value
            .trim();

        if (!nome || !telefone || !produto) {
            alert("Preencha o nome, o telefone e o produto.");
            return;
        }

        if (telefone.length < 10 || telefone.length > 11) {
            alert("Digite um telefone válido com DDD.");
            return;
        }

        const mensagem =
            `Olá, ${nome}! Tudo bem? Estou entrando em contato sobre o seu interesse no produto ${produto}. Ficou com alguma dúvida? Posso te ajudar!`;

        const link =
            `https://wa.me/55${telefone}?text=${encodeURIComponent(mensagem)}`;

        window.open(link, "_blank");
    });