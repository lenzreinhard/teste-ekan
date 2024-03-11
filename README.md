# teste-ekan

#Olá bom dia a todos. Segue abaixo algumas informações úteis sobre como foi desenvolvida a aplicação.

#O backend foi desenvolvido utilizando o java spring boot (mais especificamente o software suittools 4 for eclipse ) e também foi utilizado uma dependência chamada lombok.

download link ->
https://cdn.spring.io/spring-tools/release/STS4/4.21.1.RELEASE/dist/e4.30/spring-tool-suite-4-4.21.1.RELEASE-e4.30.0-win32.win32.x86_64.self-extracting.jar

donwload link Lombok ->
https://projectlombok.org/downloads/lombok.jar
download link eclipse -> 
https://www.eclipse.org/downloads/download.php?file=/oomph/epp/2023-12/R/eclipse-inst-jre-win64.exe

download vscode link ->
https://code.visualstudio.com/download

#Após baixado os 2 arquivos, executar para a instalação.

PS: Quando estava desenvolvendo tive dificuldade com a biblioteca java.util.Collection.
O jdk não estava reconhecendo.
Após eu remover a library e adicionar novamente algumas vezes o erro sumiu.

#Para rodar o software no backend basta basta localizar dentro do suittools o projeto com pasta chamada backend (disponibilizado aqui no github) e dar o play dentro do suit tools.
#Será inicializada uma aplicação no endereceço localhost:8080 e esse sera o endpoint base para o front-end.

#Para rodar o software no front-end basta abrir o projeto na pasta frontend-ekan e executar o comando npm run ng serve.

#A aplicação estára disponível no endereco web: localhost:4200

--------------------------------------------------------------------------------------------------------------------------

Sobre a aplicação

Quando tudo estiver correto a aplicação terá disponível duas telas: Beneficiários e Documentos.

inicialmente os dados estárão vazios e a cada restart do backend será resetado (está usando banco local H2).

Para incluir 1 beneficiario será necessário primeiro incluir ao menos 1 documento (pois todos os campos são obirgatórios).

O swagger está disponível no endereço: http://localhost:8080/swagger-ui/index.html

Uma observação útil para entender como foi desenvolvido é que 1 documento só pode pertencer a 1 beneficiario...se tentar colocar mais de 1 com o mesmo documento... o último será o que estára realmente com ele.

No resto é bem intuitivo...é possivel fazer o CRUD nas 2 telas.

Qualquer dúvida me coloco a disposição para esclarecimentos:

Email: lenz.reinhard@outlook.com

Whatsapp: +55 11 96573-5886.
