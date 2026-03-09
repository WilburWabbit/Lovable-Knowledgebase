
DELETE FROM api_collections
WHERE id IN (
  SELECT id FROM (
    SELECT id, ROW_NUMBER() OVER (PARTITION BY name ORDER BY created_at ASC) as rn
    FROM api_collections
  ) ranked
  WHERE rn > 1
);
