import { useDispatch, useSelector } from 'react-redux'
import { useGetProdutosQuery } from '../services/api'

import { Produto as ProdutoType } from '../App'
import Produto from '../components/Produto'

import { RootReducer } from '../redux/store'
import { addFavoritos } from '../redux/reducers/favoritos'

import * as S from './styles'

const ProdutosComponent = () => {
  const { data: produtos, isLoading } = useGetProdutosQuery()

  const favoritos = useSelector(
    (state: RootReducer) => state.favoritos.favoritos
  )

  const dispatch = useDispatch()

  if (isLoading) return <h2>Carregando...</h2>

  const produtoEstaNosFavoritos = (produto: ProdutoType) => {
    return favoritos.some((favorito) => favorito.id === produto.id)
  }

  const handleFavoritar = (produto: ProdutoType) => {
    dispatch(addFavoritos(produto))
  }

  return (
    <>
      <S.Produtos>
        {produtos?.map((produto) => (
          <Produto
            estaNosFavoritos={produtoEstaNosFavoritos(produto)}
            key={produto.id}
            produto={produto}
            addFavoritos={handleFavoritar}
          />
        ))}
      </S.Produtos>
    </>
  )
}

export default ProdutosComponent
