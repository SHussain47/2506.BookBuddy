import { useId } from "react";

export default function SearchBar({
  value,
  onChange,
  onClear,
  isLoading = false,
}) {
  const inputId = useId();

  return (
    <div className="searchbar" style={{ display: "grid", gap: 8 }}>
      <label htmlFor={inputId} style={{ fontWeight: 600 }}>
        Search books
      </label>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
        }}
      >
        <input
          id={inputId}
          type="search"
          inputMode="search"
          placeholder="Title, author…"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          aria-label="Search books"
          aria-busy={isLoading ? "true" : undefined}
          style={{
            flex: 1,
            padding: "10px 12px",
            borderRadius: 8,
            border: "1px solid #d0d7de",
            outline: "none",
          }}
        />

        {value ? (
          <button
            type="button"
            onClick={onClear}
            title="Clear search"
            aria-label="Clear search"
            style={{
              padding: "8px 12px",
              borderRadius: 8,
              border: "1px solid #d0d7de",
              background: "white",
              cursor: "pointer",
            }}
          >
            Clear
          </button>
        ) : null}
      </div>

      <div
        role="status"
        aria-live="polite"
        style={{ minHeight: 18, fontSize: 12, color: "#57606a" }}
      >
        {isLoading ? "Searching…" : " "}
      </div>
    </div>
  );
}