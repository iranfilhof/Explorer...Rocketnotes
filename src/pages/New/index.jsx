import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { api } from '../../services/api';

import { Button } from '../../components/Button';
import { Header } from '../../components/Header';
import { Input } from '../../components/Input';
import { NoteItem } from '../../components/NoteItem';
import { Section } from '../../components/Section';
import { Textarea } from '../../components/TextArea';

import { Container, Form } from './styles';

export function New() {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")

  const [links, setLinks] = useState([])
  const [newLink, setNewLink] = useState("")

  const [tags, setTags] = useState([])
  const [newTag, setNewTag] = useState("")

  const navigate = useNavigate()

  function handleAddLink() {
    setLinks(prevState => [...prevState, newLink])
    setNewLink("")
  }

  function handleRemoveLink(deleted) {
    setLinks(prevState => prevState.filter(link => link !== deleted))
  }

  function handleAddTag() {
    setTags(prevState => [...prevState, newTag])
    setNewTag("")
  }

  function handleRemoveTag(deleted) {
    setTags(prevState => prevState.filter(tag => tag !== deleted))
  }

  async function handleNewNote() {
    if(!title || !description) {
      return alert('Preencha os campos "Título" e "Observações" antes de criar a nota!')
    }

    if(newTag || newLink) {
      return alert('Clique no "+" para adicionar seu Link/Tag!')
    }

    if(tags.length == 0 || links.length == 0) {
      return alert("Sua nota obrigatóriamente, precisa tem no mínimo um Link e uma Tag!")
    }

    await api.post("/notes", {
      title,
      description,
      tags,
      links
    })

    alert("Nota criada com sucesso!")
    navigate(-1)
  }

  return (
    <Container>
      <Header />

      <main>
        <Form>
          <header>
            <h1>Criar notas</h1>
            <Link to={-1}>Voltar</Link>
          </header>

          <Input 
          placeholder="Título" 
          onChange={e => setTitle(e.target.value)}
          />

          <Textarea 
          placeholder="Observações"
          onChange={e => setDescription(e.target.value)}
          />

          <Section title="Links úteis">
            {
              links.map((link, index) => (
                <NoteItem 
                key={String(index)}
                value={link}
                onClick={() => handleRemoveLink(link)} 
                />
              ))
            }
            <NoteItem 
            isNew 
            placeholder="Novo link" 
            value={newLink}
            onChange={e => setNewLink(e.target.value)}
            onClick={handleAddLink} />
          </Section>

          <Section
          title="Marcadores"
          >
            <div className="tags">
            {
              tags.map((tag, index) => (
                <NoteItem 
                key={String(index)}
                value={tag}
                onClick={() => handleRemoveTag(tag)} 
                />
              ))
            }
            <NoteItem 
            isNew 
            placeholder="Novo Marcador"
            value={newTag}
            onChange={e => setNewTag(e.target.value)}
            onClick={handleAddTag} />
            </div>
          </Section>

          <Button 
          title="Salvar"
          onClick={handleNewNote}
          />
        </Form>
      </main>
    </Container>
  )
}