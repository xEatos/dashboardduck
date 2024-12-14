SELECT videos.title,
  videos.duration,
  SUBSTRING(locale, 1, 2) AS language,
  sourcesite AS hostedby,
  CONCAT("https://www.youtube.com/watch?v=", sourceid) AS url,
  sourcethumb AS thumbnail,
  GROUP_CONCAT(disciplines.name) AS categories
FROM videos,
  disciplines,
  connection_video_discipline
WHERE videos.id = connection_video_discipline.video
  AND disciplines.id = connection_video_discipline.discipline
  AND videos.deleted_at IS NULL
  AND videos.content_access = "published"
  AND LENGTH(videos.title) > 1
  AND duration > 1
  AND locale IS NOT NULL
  AND sourcethumb IS NOT NULL
  AND sourceid IS NOT NULL
  AND sourcesite IS NOT NULL
  AND sourcesite <> ""
GROUP BY videos.title,
  videos.duration,
  locale,
  sourceid,
  sourcethumb,
  sourcesite