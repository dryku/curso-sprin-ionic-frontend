import { ProdutoDTO } from "./Produto.dto";

export interface CartItem {
    qtdItem: number,
    produto: ProdutoDTO
}