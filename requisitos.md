# Requisitos do projeto

- O cliente não gostaria que registros importantes do
sistema, como as Pessoas, sejam apagados definitivamente
do banco de dados.

- Para deixar a interface mais limpa, o cliente gostaria
que na lista de Pessoas, por padrão, fossem exibidos
somente os usuários ativos.

- Foram percebidas algumas folhas de validação dos
formulários por parte do front-end, o que resultou em dados
de email inválidos no banco. É desejável que essa validação
não seja responsabilidade exclusiva do front.

- É importate poder consultar todas as matriculas
confirmadas referentes a estudante X de forma rápida.

- O cliente gostaria de poder consultar as turmas abertas
por intervalo de data, para não receber informações
desnecessárias (como turmas antigas).

- O cliente gostaria que, uma vez que o cadastro de um estudante
fosse desativado, todas as matriculas relativas a este estudante
automaticamente passasem a constar como "canceladas"