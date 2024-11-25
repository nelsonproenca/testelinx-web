import { useCadastros } from "../../../../contexts/CadastrosContextData";

const ModalPowerApps = () => {
  const { powerAppsItem } = useCadastros();

  const powerApps = powerAppsItem;

  return (
    <div className="modal" id="modalPowerApps">
      <div className="modal-dialog modal-xl">
        <div className="modal-content">
          <div className="modal-body">
            {powerApps?.appId && (
              <iframe
                style={{ width: "100%" }}
                height={750}
                src={`https://apps.powerapps.com/play/${powerApps?.appId}?source=website&screenColor=rgba(165,34,55,1)`}
                allow="geolocation; microphone; camera"
              />
            )}
          </div>
          <div className="modal-footer">
            <button type="button" className="w-25" data-bs-dismiss="modal">
              Fechar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalPowerApps;
