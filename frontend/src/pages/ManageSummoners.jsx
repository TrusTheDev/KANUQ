import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { UserPlus } from "lucide-react";

const API_BASE = `${process.env.REACT_APP_BACKEND_URL}/api`;

const ManageSummoners = () => {
  const [riotId, setRiotId] = useState("");
  const [summoners, setSummoners] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const fetchSummoners = async () => {
    try {
      const response = await axios.get(`${API_BASE}/summoners?refresh=false`);
      setSummoners(response.data || []);
    } catch (err) {
      setError("No pudimos cargar la lista de invocadores.");
    }
  };

  useEffect(() => {
    fetchSummoners();
  }, []);

  const handleAddSummoner = async () => {
    if (!riotId.trim()) {
      setError("Ingresa un Riot ID válido.");
      return;
    }
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      await axios.post(`${API_BASE}/summoners`, { riot_id: riotId.trim() });
      setSuccess("Invocador agregado y baseline registrada.");
      setRiotId("");
      fetchSummoners();
    } catch (err) {
      setError("No se pudo agregar. Verifica el Riot ID e intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-10" data-testid="manage-page">
      <section className="space-y-6" data-testid="manage-header">
        <div className="flex items-center gap-3">
          <UserPlus className="text-hextech-400" />
          <h1
            className="font-heading text-3xl md:text-4xl uppercase tracking-widest text-gold-100"
            data-testid="manage-title"
          >
            Gestionar invocadores
          </h1>
        </div>
        <p
          className="text-base text-gold-300/80 max-w-2xl"
          data-testid="manage-subtitle"
        >
          Agrega nuevos jugadores usando su Riot ID (GameName#TAG). El sistema
          guardará el baseline de LP y empezará el seguimiento desde ese
          momento.
        </p>
      </section>

      <section
        className="bg-obsidian-700/70 border border-gold-500/20 p-6 md:p-8 space-y-5"
        data-testid="manage-form-section"
      >
        <div className="flex flex-col md:flex-row gap-4" data-testid="manage-form">
          <Input
            value={riotId}
            onChange={(event) => setRiotId(event.target.value)}
            placeholder="Lorian#BIS"
            className="bg-obsidian-900 border border-gold-500/40 text-gold-100"
            data-testid="riot-id-input"
          />
          <Button
            onClick={handleAddSummoner}
            disabled={loading}
            className="clip-path-hextech bg-obsidian-600 border border-gold-400 text-gold-100 hover:bg-gold-400 hover:text-obsidian-900"
            data-testid="add-summoner-button"
          >
            {loading ? "Agregando..." : "Agregar invocador"}
          </Button>
          <Button
            type="button"
            onClick={() => setRiotId("Lorian#BIS")}
            className="bg-transparent border border-hextech-400 text-hextech-400 hover:bg-hextech-400/10"
            data-testid="add-example-button"
          >
            Usar ejemplo
          </Button>
        </div>
        {error && (
          <p className="text-sm text-red-300" data-testid="add-summoner-error">
            {error}
          </p>
        )}
        {success && (
          <p
            className="text-sm text-hextech-400"
            data-testid="add-summoner-success"
          >
            {success}
          </p>
        )}
      </section>

      <section className="space-y-4" data-testid="managed-summoners-section">
        <h2
          className="font-heading text-2xl uppercase tracking-widest text-gold-100"
          data-testid="managed-summoners-title"
        >
          Invocadores registrados
        </h2>
        <div
          className="grid gap-4 md:grid-cols-2"
          data-testid="managed-summoners-list"
        >
          {summoners.map((summoner) => (
            <div
              key={summoner.id}
              className="bg-obsidian-700/70 border border-gold-500/20 p-5 flex flex-col gap-4"
              data-testid={`managed-summoner-card-${summoner.id}`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p
                    className="font-ui text-lg text-gold-100"
                    data-testid={`managed-summoner-name-${summoner.id}`}
                  >
                    {summoner.riot_id}
                  </p>
                  <p
                    className="text-xs uppercase tracking-widest text-gold-300"
                    data-testid={`managed-summoner-rank-${summoner.id}`}
                  >
                    {summoner.current_tier} {summoner.current_rank}
                  </p>
                </div>
                <Badge
                  className="bg-transparent border border-hextech-400 text-hextech-400 font-ui"
                  data-testid={`managed-summoner-lp-gained-${summoner.id}`}
                >
                  {summoner.lp_gained >= 0
                    ? `+${summoner.lp_gained}`
                    : summoner.lp_gained} LP
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <p
                  className="text-sm text-gold-300"
                  data-testid={`managed-summoner-baseline-${summoner.id}`}
                >
                  Baseline: {summoner.baseline_lp} LP
                </p>
                <Link
                  to={`/invocador/${summoner.id}`}
                  className="text-sm text-hextech-400 hover:text-hextech-300"
                  data-testid={`managed-summoner-detail-link-${summoner.id}`}
                >
                  Ver detalle
                </Link>
              </div>
            </div>
          ))}
          {!summoners.length && (
            <div
              className="text-sm text-gold-300"
              data-testid="managed-summoners-empty"
            >
              Aún no hay invocadores registrados.
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default ManageSummoners;
