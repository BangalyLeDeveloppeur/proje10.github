import { useCallback, useState } from "react";
import PropTypes from "prop-types";
import Field, { FIELD_TYPES } from "../../components/Field";
import Select from "../../components/Select";
import Button, { BUTTON_TYPES } from "../../components/Button";

const mockContactApi = () =>
  new Promise((resolve) => {
    setTimeout(resolve, 500);
  });
const Form = ({ onSuccess, onError }) => {
  const [sending, setSending] = useState(false);
  const [formatData, setFormatData] = useState({
    nom: "",
    prenom: "",
    email: "",
    type: "",
    message: "",
  });
  const iniFormulaire = {
    nom: "",
    prenom: "",
    email: "",
    type: "",
    message: "",
  };
  const viderFormulaire = () => {
    setFormatData(iniFormulaire);
  };

  const handleChange = (field, value) => {
    setFormatData({ ...formatData, [field]: value });
  };

  const sendContact = useCallback(
    async (evt) => {
      evt.preventDefault();
      setSending(true);
      try {
        await mockContactApi();
        setSending(false);
        onSuccess();
        viderFormulaire(); // Réinitialiser le formulaire après envoi
      } catch (err) {
        setSending(false);
        onError(err);
      }
    },
    [onSuccess, onError]
  );

  return (
    <form onSubmit={sendContact}>
      <div className="row">
        <div className="col">
          <Field
            placeholder=""
            label="Nom"
            value={formatData.nom}
            onChange={(e) => handleChange("nom", e.target.value)}
          />
          <Field
            placeholder=""
            label="Prénom"
            value={formatData.prenom}
            onChange={(e) => handleChange("prenom", e.target.value)}
          />
          <Select
            selection={["Personel", "Entreprise"]}
            value={formatData.type}
            onChange={(value) => handleChange("type", value)}
            label="Personel / Entreprise"
            type="large"
            titleEmpty
          />
          <Field
            placeholder=""
            label="Email"
            value={formatData.email}
            onChange={(e) => handleChange("email", e.target.value)}
          />
          <Button type={BUTTON_TYPES.SUBMIT} disabled={sending}>
            {sending ? "En cours" : "Envoyer"}
          </Button>
        </div>

        <div className="col">
          <Field
            placeholder="message"
            label="Message"
            type={FIELD_TYPES.TEXTAREA}
            value={formatData.message}
            onChange={(e) => handleChange("message", e.target.value)}
          />
        </div>
      </div>
    </form>
  );
};

Form.propTypes = {
  onError: PropTypes.func,
  onSuccess: PropTypes.func,
};

Form.defaultProps = {
  onError: () => null,
  onSuccess: () => null,
};

export default Form;
