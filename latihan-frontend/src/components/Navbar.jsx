import React from 'react';
import { Navbar as BsNavbar, Container, Nav, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';


function Navbar() {
const navigate = useNavigate();
const token = localStorage.getItem('token');


const handleLogout = () => {
localStorage.removeItem('token');
navigate('/login');
};


return (
<BsNavbar bg="dark" variant="dark" expand="md" className="mb-3">
<Container>
<BsNavbar.Brand href="/">Latihan Frontend</BsNavbar.Brand>
<BsNavbar.Toggle aria-controls="basic-navbar-nav" />
<BsNavbar.Collapse id="basic-navbar-nav">
<Nav className="me-auto">
{token && (
<Nav.Link onClick={() => navigate('/dashboard')}>Dashboard</Nav.Link>
)}
</Nav>
<div className="d-flex gap-2">
{!token ? (
<>
<Button variant="outline-light" onClick={() => navigate('/login')}>Login</Button>
<Button variant="warning" onClick={() => navigate('/register')}>Register</Button>
</>
) : (
<Button variant="danger" onClick={handleLogout}>Logout</Button>
)}
</div>
</BsNavbar.Collapse>
</Container>
</BsNavbar>
);
}


export default Navbar;