import { Container, Links, Content } from "./styles";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { Header } from '../../components/Header'
import { Button } from '../../components/Button'
import { ButtonText } from '../../components/ButtonText'
import { Section } from "../../components/Section";
import { Tags } from "../../components/Tags";
import { api } from "../../services/api";

export function Details() {
  const [data, setData] = useState(null)

  const params = useParams()
  const navigate = useNavigate()

  function handleBack() {
    navigate(-1)
  }

  async function handleRemoveNote() {
    const confirm = window.confirm("Deseja realmente excluir a nota?")

    if(confirm) {
      await api.delete(`/notes/${params.id}`)
      handleBack()
    }
  }

  useEffect(() => {
    async function fetchNotes() {
      const response = await api.get(`/notes/${params.id}`)
      setData(response.data)
    }

    fetchNotes()
  }, []) 

  return (
    <Container>
      <Header />
      {
        data &&
        <main>
          <Content>
            <ButtonText title="Excluir a nota" onClick={handleRemoveNote} />

              <h1>
                {data.title}
              </h1>

              <p>
                {data.description}
              </p>

            {
              data.links &&
              <Section title="Links úteis">
              <Links>
                {
                  data.links.map(link => (
                    <li key={String(link.id)}><a href={link.url} target="_blank">{link.url}</a></li>
                  ))
                }
              </Links>
            </Section>
            }

            {
              data.tags &&
              <Section title="Marcadores">
                {
                  data.tags.map(tag => (
                    <Tags key={String(tag.id)} title={tag.name} />
                  ))
                }
              </Section>
            }
            <Button title="Voltar" onClick={handleBack} />
          </Content>
        </main>
      }
    </Container>
  )
};