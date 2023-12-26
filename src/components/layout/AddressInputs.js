export default function AddressInputs({ addressProps, setAddressProp, disabled = false }) {
  const { phone, streetAddress, } = addressProps;
  // console.log(phone);
  return (
    <>
      <label>Teléfono</label>
      <input
        disabled={disabled}
        type="tel" placeholder="Teléfono"
        value={phone || ''} onChange={ev => setAddressProp('phone', ev.target.value)} />
      <label>Dirección</label>
      <input
        disabled={disabled}
        type="text" placeholder="Dirección"
        value={streetAddress || ''} onChange={ev => setAddressProp('streetAddress', ev.target.value)}
      />
    </>
  );
}