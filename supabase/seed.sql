-- ============================================================================
-- seed.sql — run once after schema.sql. Copies the shelves that used to live
-- in src/data.ts into the database. Images point at the WebP files already
-- bundled in public/images.
-- ============================================================================

with desk as (
  insert into public.shelves (title, subtitle, icon, position)
  values ('the desk shelf', 'stuff on my desk & apps i live in', 'ti-bulb', 0)
  returning id
), fitness as (
  insert into public.shelves (title, subtitle, icon, position)
  values ('the fitness shelf', 'what''s keeping me moving', 'ti-run', 1)
  returning id
)
insert into public.items (shelf_id, title, source, url, image, position)
select desk.id, v.title, v.source, v.url, v.image, v.position from desk, (values
  ('gaming 27 monitor',      'amazon', 'https://amzn.to/3Ky61E4', '/images/monitor.webp',       0),
  ('standing desk',          'amazon', 'https://amzn.to/49ZvDn8', '/images/standing-desk.webp', 1),
  ('monitor arm',            'amazon', 'https://amzn.to/3SvzKkR', '/images/monitor-arm.webp',   2),
  ('desk chair',             'amazon', 'https://amzn.to/46Px6dk', '/images/office-chair.webp',  3),
  ('macbook air',            'amazon', 'https://amzn.to/4e5rOPS', '/images/laptop.webp',        4),
  ('macbook pro',            'amazon', 'https://amzn.to/43vBkFX', '/images/striff-hub.webp',    5),
  ('logitech keyboard',      'amazon', 'https://amzn.to/3Iqr8HV', '/images/keyboard.webp',      6),
  ('ipad pencil (knockoff)', 'amazon', 'https://amzn.to/3IPBVeF', '/images/ipad-pencil.webp',   7),
  ('standing lamp',          'amazon', 'https://amzn.to/3KwYtS3', '/images/standing-lamp.webp', 8),
  ('docking port',           'amazon', 'https://amzn.to/3IOil2x', '/images/striff-hub.webp',    9)
) as v(title, source, url, image, position)
union all
select fitness.id, v.title, v.source, v.url, v.image, v.position from fitness, (values
  ('treadmill',           'amazon',     'https://amzn.to/4x5N67f',            '/images/treadmill.webp',       0),
  ('ultrahuman ring air', 'ultrahuman', 'https://ultrahuman.com/chubbytoday', '/images/ultrahuman-ring.webp', 1),
  ('pull up bar',         'amazon',     'https://amzn.to/4uAPMHS',            '/images/pull-up-bar.webp',     2),
  ('dumbbell set',        'amazon',     'https://amzn.to/3T8eSQZ',            '/images/dumbbell.webp',        3)
) as v(title, source, url, image, position);
