import { RefDTO } from "./ref.dto";
import { ItemPedidoDTO } from "./item-pedido.dto";
import { PagamentoDTO } from "./pagamento.dto";
import { RefEnderecoDTO } from "./ref-endereco.dto";
import { RefClienteDTO } from "./ref-cliente.dto";

export interface PedidoDTO {
//    cliente: RefDTO;
//    enderecoDeEntrega: RefDTO;

    cliente: RefClienteDTO;
    enderecoDeEntrega: RefEnderecoDTO;
    pagamento: PagamentoDTO;
    itens: ItemPedidoDTO[];

}