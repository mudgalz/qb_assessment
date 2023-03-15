import { useState } from "react";

export default function BookTicketForm({ show, handleToggleForm }) {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [ticketCount, setTicketCount] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState("");
  const showName = show.name;
  const showTime = show.schedule.days + " at " + show.schedule.time;

  // Form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    const dataObject = {
      email,
      phone,
      paymentMethod,
      showName,
      showTime,
      ticketCount,
    };
    localStorage.setItem("userData", JSON.stringify(dataObject));
    alert("Ticket Booked");
    console.log(JSON.parse(localStorage.getItem("userData")));
  };

  // Getting ticket count
  const handleTicketCountChange = (event) => {
    setTicketCount(parseInt(event.target.value));
  };

  const ticketCounts = [
    { value: 1, label: "1" },
    { value: 2, label: "2" },
    { value: 4, label: "4" },
  ];
  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 600 }} className="border p-4 rounded m-auto shadow-lg">
      <h3>Book Ticket for {show.name}</h3>
      <div className="my-3">
        <label htmlFor="name" className="form-label">
          Show Name
        </label>
        <input type="text" className="form-control" id="name" value={show.name} disabled />
      </div>
      <div className="my-3">
        <label htmlFor="show-time" className="form-label">
          Show Time
        </label>
        <input type="text" className="form-control" id="show-time" value={show.schedule.time === "" ? "NA" : show.schedule.days + " at " + show.schedule.time} disabled />
      </div>
      <div className="mb-3">
        <label htmlFor="email" className="form-label">
          Email
        </label>
        <input required type="email" className="form-control" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>
      <div className="mb-3">
        <label htmlFor="phone" className="form-label">
          Phone
        </label>
        <input required type="text" className="form-control" id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
      </div>

      <div className="form-group d-flex gap-3 my-3">
        <label htmlFor="ticket-count">Number of Tickets:</label>
        {ticketCounts.map(({ value, label }) => (
          <div className="form-check" key={value}>
            <input className="form-check-input" type="radio" name="ticket-count" id={value} value={value} checked={ticketCount === value} onChange={handleTicketCountChange} />
            <label className="form-check-label" htmlFor={value}>
              {label}
            </label>
          </div>
        ))}
      </div>

      <label htmlFor="payment">Payment Method</label>
      <select required id="payment" className="form-select mt-2 mb-4" value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
        <option value="">Choose</option>
        <option value="paytm">Paytm</option>
        <option value="gpay">Google Pay</option>
        <option value="upi">UPI</option>
      </select>

      <button type="submit" className="btn btn-primary mr-4">
        Book Now
      </button>
      <button type="button" className="btn btn-secondary" style={{ marginLeft: 10 }} onClick={() => handleToggleForm()}>
        Cancel
      </button>
    </form>
  );
}
