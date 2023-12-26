/* eslint-disable react/function-component-definition */
import React, { useState } from 'react';
import { Input } from 'baseui/input';
import { Button } from 'baseui/button';

function Form() {
  async function inviaForm() {
    const r = await fetch('/trovautente', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!r.ok) {
      console.error('Errore nella richiesta');
      return;
    }

    const data = await r.json();
    console.log(data);

    return (
      <div>
        <Input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Controlled Input"
          clearOnEscape
        />
        <Button onClick={() => setValue('email')}>Trova Utente</Button>
        {value}
      </div>
    );
  }
}
export default Form;
