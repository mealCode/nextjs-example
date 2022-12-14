import { useRef } from 'react';
import classes from './newsletter-registration.module.css';

function NewsletterRegistration() {
  const emailRef = useRef();

  async function registrationHandler(event) {
    event.preventDefault();

    const response = await fetch('/api/newsletter', {
      method: 'POST',
      body: JSON.stringify({ email: emailRef.current.value }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const result = await response.json();
    console.log(result);
  }

  return (
    <section className={classes.newsletter}>
      <h2>Sign up to stay updated!</h2>
      <form onSubmit={registrationHandler}>
        <div className={classes.control}>
          <input
            type="email"
            id="email"
            placeholder="Your email"
            aria-label="Your email"
            ref={emailRef}
          />
          <button type="submit">Register</button>
        </div>
      </form>
    </section>
  );
}

export default NewsletterRegistration;
