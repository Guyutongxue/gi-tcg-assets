// @ts-check
import { characters, entities, actionCards, keywords } from "@gi-tcg/static-data";

/**
 * @typedef {import("@vercel/node").VercelRequest} VercelRequest
 * @typedef {import("@vercel/node").VercelResponse} VercelResponse
 */

const skills = characters.flatMap((ch) => ch.skills);

/**
 * 
 * @param {import('@gi-tcg/static-data').EntityRawData} x 
 */
function key(x) {
  if (x.type === "GCG_CARD_SUMMON") return 0;
  else return 1;
}

const sortedEntities = entities.toSorted((a, b) => key(a) - key(b));

const all = [...characters, ...actionCards, ...skills, ...sortedEntities, ...keywords];

/**
 *
 * @param {VercelRequest} req
 * @param {VercelResponse} res
 * @returns
 */
export default function handler(req, res) {
  const { id } = req.query;
  const found = all.find((obj) => obj.id === Number(id));
  if (found) {
    res.status(200).json(found);
    return;
  } else {
    res.status(404).send("Not found");
    return;
  }
}