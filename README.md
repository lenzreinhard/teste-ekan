# teste-ekan

#Olá bom dia a todos. Segue abaixo algumas informações úteis sobre como foi desenvolvida a aplicação.

#O backend foi desenvolvido utilizando o java spring boot (mais especificamente o software suittools 4).
#Para rodar o software basta localizar dentro do suittools o projeto raiz(disponibilizado aqui no github), importar todas as classes e executar o run.
#será subido uma aplicação no endereceço localhost:8080 e esse sera o endpoint base para o front-end.

#já no front-end o software foi desenvolvido no vscode.
#para executar o programa basta abrir o projeto no diretório fronted-ekan (está errado mesmo o nome....percebi agora) e, executar o seguinte comando:

npm i

#depois de instalado o software para rodar basta executar:

npm run ng serve

#a aplicação estára disponível no endereco web: localhost:4200

--------------------------------------------------------------------------------------------------------------------------

Sobre a aplicação

Quando tudo estiver correto a aplicação terá disponível duas telas: Beneficiários e Documentos.

inicialmente os dados estárão vazios e a cada restart do backend será resetado (está usando banco local H2).

Para incluir 1 beneficiario será necessário primeiro incluir ao menos 1 documento (pois todos os campos são obirgatórios).

Uma observação útil para entender como foi desenvolvido é que 1 documento só pode pertencer a 1 beneficiario...se tentar colocar mais de 1 com o mesmo documento... o último será o que estára realmente com ele.

No resto é bem intuitivo...é possivel fazer o CRUD nas 2 telas.

Qualquer dúvida me coloco a disposição para esclarecimentos:

Email: lenz.reinhard@outlook.com

Whatsapp: +55 11 96573-5886.
