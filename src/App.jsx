import { Routes, Route, NavLink, Navigate, useParams } from 'react-router-dom';


//Active-Link Style
const linkStyle = ({ isActive }) => ({
  textDecoration: isActive ? 'underline' : 'none'
});


export default function App() {
  // Role A replace with AuthContext
  const isLoggedIn = false;


  return (
    <>
      <header style={{ padding: '12px 16px', borderBottom: '1px solid #ddd' }}>
        <nav style={{ display: 'flex', gap: 12, alignItems: 'center' }}>

          <NavLink to="/books" style={linkStyle}>
            <strong>Book Buddy</strong>
          </NavLink>

          <div style={{ flex: 1 }} />

          {!isLoggedIn ? (
            <>
              <NavLink to="/books" style={linkStyle}>Books</NavLink>
              <NavLink to="/register" style={linkStyle}>Register</NavLink>
              <NavLink to="/login" style={linkStyle}>Login</NavLink>
            </>
          ) : (
            <>
            <NavLink to="/books" style={linkStyle}>Books</NavLink>
            <NavLink to="/account" style={linkStyle}>Account</NavLink>
            <button onClick={handleLogout} style={{ all: 'unset', cursor: 'pointer', textDecoration: 'underline' }}>
              Log out
            </button>
          </>
        )}
        </nav>
      </header>


      <main style={{ padding: '16px', maxWidth: 900, margin: '0 auto'}}>
        <Routes>
          <Route path="/" element={<Navigate to="/books" replace />} />
          <Route path="/books" element={<BooksPage />} />
          <Route path="books/:id" element={<BookDetailLinkOnly />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/account" element={<AccountPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
    </>
  );
}


/* Placeholder Pages for now */


function BooksPage() {
  return (
    <>
      <h1>Catalog</h1>
      <p>(Role B) TODO: Fetch from <code>/books</code>, show title/author/availability/cover. Each item links to <code>/books/:id</code>.</p>
    </>
  );
}

function BookDetailLinkOnly() {
  const { id } = useParams();
  return (
    <>
    <h1>Book #{id}</h1>
    <p>(Role C) Details & reserve/return actions here. Role B link to this page.</p>
    <NavLink to="/books">Back to Books</NavLink>
    </>
  );
}

function RegisterPage() { 
  return <h1>Register</h1>; 
}

function LoginPage() {
  return (
    <>
      <h1>Login</h1>
      <p>
        Need an account? <NavLink to="/register">Register here.</NavLink>
      </p>
    </>
  );
}

function AccountPage() {
  return <h1>Account</h1>; // Role A/C fill this
}

function NotFoundPage() {
  return (
    <>
      <h1>Page not found</h1>
      <NavLink to="/books">Go back to Books</NavLink>
    </>
  );
}