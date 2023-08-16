
class CaixaDaLanchonete {
    
    calcularValorDaCompra(metodoDePagamento, itens) {
        let total = 0;
        let erro = null;
        let numeroFormatado = null;
        if (itens.length == 0) {
            return "Não há itens no carrinho de compra!";
        }
        const pedido = carregarPedido(itens);

        pedido.forEach(element => {
            if (element.quantIte <= 0) {
                erro = "Quantidade inválida!";
            } else {
                if (cardapio.hasOwnProperty(element.cod)) {
                    total += element.valor * element.quantIte;
                    if (element.descricao.includes('extra')) {
                        let dupli = pedido.filter(a => {
                            return a.conexao == element.conexao && a != 0;
                        });
                        if (dupli.length < 2) {
                            erro = "Item extra não pode ser pedido sem o principal";
                        }
                    }
                } else {
                    erro = "Item inválido!";
                }
            }
        });
        if (erro != null) {
            return erro;
        }
        switch (metodoDePagamento) {
            case 'credito':
                total = +(total + (total * 0.03)).toFixed(2);
                numeroFormatado = total.toLocaleString("pt-br", { style: "currency", currency: "BRL" });
                break;
            case 'debito':
                numeroFormatado = total.toLocaleString("pt-br", { style: "currency", currency: "BRL" });
                break;
            case 'dinheiro':
                total = +(total - (total * 0.05)).toFixed(2);
                numeroFormatado = total.toLocaleString("pt-br", { style: "currency", currency: "BRL" });
                break;
            default:
                return "Forma de pagamento inválida!";
        }
        if (numeroFormatado != null) {
            return numeroFormatado;
        }
    }
}

class itemPedido {
    constructor(descricao, valor, conexao, quantIte = 0, cod = 0) {
        this.descricao = descricao;
        this.valor = valor;
        this.conexao = conexao;
        this.quantIte = quantIte;
        this.cod = cod;
    }
}

const cardapio = {
    cafe: new itemPedido('Café', 3, 1),

    suco: new itemPedido('Suco Natural', 6.2, 0),

    chantily: new itemPedido('Chantily (extra do café)', 1.5, 1),

    queijo: new itemPedido('Queijo (extra do sanduiche)', 2.0, 2),

    sanduiche: new itemPedido('Sanduiche', 6.5, 2),

    salgado: new itemPedido('Salgado', 7.25, 0),

    combo1: new itemPedido('1 Suco e 1 Sanduíche', 9.5, 0),

    combo2: new itemPedido('1 café e 1 Sanduíche', 7.5, 0)
}


function carregarPedido(itens) {
    let pedido = [];
    itens.forEach(element => {
        let nomeItem = element.split(',')[0];
        let cod = nomeItem;
        let des = cardapio[nomeItem]?.descricao;
        let valorUni = cardapio[nomeItem]?.valor;
        let con = cardapio[nomeItem]?.conexao;
        let quantIte = parseFloat(element.split(',')[1]);
        pedido.push(new itemPedido(des, valorUni, con, quantIte, cod));
    });

    return pedido;
}



export { CaixaDaLanchonete };