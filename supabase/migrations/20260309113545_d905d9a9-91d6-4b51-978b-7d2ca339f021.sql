
ALTER TABLE api_collections ADD COLUMN parent_id uuid REFERENCES api_collections(id) ON DELETE CASCADE DEFAULT NULL;
CREATE INDEX idx_api_collections_parent_id ON api_collections(parent_id);
