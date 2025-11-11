import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';


function FormModal({ show, onHide, form, setForm, onSubmit, isEditing }) {
return (
<Modal show={show} onHide={onHide} centered>
<Modal.Header closeButton>
<Modal.Title>{isEditing ? 'Edit Data' : 'Tambah Data'}</Modal.Title>
</Modal.Header>
<Modal.Body>
<Form onSubmit={(e)=>{e.preventDefault(); onSubmit();}}>
<Form.Group className="mb-3">
<Form.Label>Judul</Form.Label>
<Form.Control
placeholder="Judul item"
value={form.title}
onChange={(e)=> setForm({ ...form, title: e.target.value })}
required
/>
</Form.Group>
<Form.Group className="mb-3">
<Form.Label>Deskripsi</Form.Label>
<Form.Control
as="textarea"
rows={3}
placeholder="Deskripsi singkat"
value={form.description}
onChange={(e)=> setForm({ ...form, description: e.target.value })}
required
/>
</Form.Group>
<div className="d-flex justify-content-end gap-2">
<Button variant="secondary" onClick={onHide}>Batal</Button>
<Button type="submit" variant="primary">Simpan</Button>
</div>
</Form>
</Modal.Body>
</Modal>
);
}


export default FormModal;