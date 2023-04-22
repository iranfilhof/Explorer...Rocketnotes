import { Container, Links, Content } from "./styles";

import { Header } from '../../components/Header'
import { Button } from '../../components/Button'
import { ButtonText } from '../../components/ButtonText'
import { Section } from "../../components/Section";
import { Tags } from "../../components/Tags";

export function Details() {

  return (
    <Container>
      <Header />
      
      <main>
        <Content>
          <ButtonText title="Excluir a nota"/>

            <h1>
              Introdução ao React
            </h1>

            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. 
              Eveniet praesentium mollitia facilis officiis, expedita temporibus earum consequuntur, 
              sed ipsum, cupiditate odit dolorum? Vero, ducimus quia delectus reiciendis quas minus et?
            </p>

          <Section title="Links úteis">
            <Links>
              <li><a href="#">https://www.rocketseat.com.br/</a></li>
              <li><a href="#">https://www.rocketseat.com.br/</a></li>
            </Links>
          </Section>

          <Section title="Marcadores">
            <Tags title="express"/>
            <Tags title="nodejs"/>
          </Section>

          <Button title="Voltar"/>
        </Content>
      </main>
    </Container>
  )
};