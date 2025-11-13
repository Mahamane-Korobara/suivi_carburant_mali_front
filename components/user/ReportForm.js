import React, { useState } from 'react';
import usagerService from '@/pages/api/usagerService';
import { FormContainer, Title, Select, TextArea, SubmitButton } from '@/components/Styles_pages/userStyles/UserStyles';

export default function ReportForm({ stationId, onSuccess }) {
  const [type, setType] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!type) {
      setError('Veuillez sélectionner un type de signalement');
      return;
    }

    if (!message || message.trim().length < 10) {
      setError('Veuillez décrire le problème (minimum 10 caractères)');
      return;
    }

    setLoading(true);
    setError('');

    try {

      const response = await usagerService.sendReport(stationId, type, message);

      // Succès
      onSuccess();
    } catch (err) {
      console.error("Erreur lors de l'envoi:", err);
      setError(err.message || "Erreur lors de l'envoi du signalement");
    } finally {
      setLoading(false);
    }
  };

  return (
    <FormContainer>
      <Title>Quel est le problème ?</Title>
      
      {error && (
        <div style={{ 
          color: '#dc3545', 
          marginBottom: '1rem',
          padding: '0.75rem',
          backgroundColor: '#f8d7da',
          border: '1px solid #f5c6cb',
          borderRadius: '6px',
        }}>
          {error}
        </div>
      )}

      <label htmlFor="type">Type de signalement :</label>
      <Select 
        value={type} 
        id='type' 
        onChange={(e) => setType(e.target.value)}
        disabled={loading}
      >
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
        disabled={loading}
      />

      <SubmitButton onClick={handleSubmit} disabled={loading || !type || !message}>
        {loading ? 'Envoi en cours...' : 'Envoyer le signalement'}
      </SubmitButton>
    </FormContainer>
  );
}