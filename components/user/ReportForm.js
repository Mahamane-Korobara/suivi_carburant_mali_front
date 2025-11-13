import React, { useState } from 'react';
import { FormContainer, Title, Select, TextArea, SubmitButton } from '@/components/Styles_pages/userStyles/UserStyles';

export default function ReportForm({ stationId, onSuccess }) {
  const [type, setType] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!type) {
      setError('Veuillez sélectionner un type de signalement');
      return;
    }

    // Simulation d'envoi
    setLoading(true);
    setError('');

    setTimeout(() => {
      setLoading(false);
      // Simule un succès
      onSuccess();
    }, 1000);
  };

  return (
    <FormContainer>
      <Title>Quel est le problème ?</Title>
      <label htmlFor="type">Type de signalement :</label>
      <Select value={type} id='type' onChange={(e) => setType(e.target.value)}>
        <option value="">Sélectionnez une catégorie</option>
        <option value="incident">Incident</option>
        <option value="erreur">Erreur</option>
        <option value="autre">Autre</option>
      </Select>

     <label htmlFor="message">Description :</label>
      <TextArea
        placeholder="Décrivez le problème ici..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        rows={6}
        id='message'
      />

      {error && <div style={{ color: 'red', marginBottom: '0.5rem' }}>{error}</div>}

      <SubmitButton onClick={handleSubmit} disabled={loading}>
        {loading ? 'Envoi en cours...' : 'Envoyer le signalement'}
      </SubmitButton>
    </FormContainer>
  );
}