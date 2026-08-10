import { services as mmoServices } from './mmo.services.js';
import { services as mswdoServices } from './mswdo.services.js';
import { services as mcroServices } from './mcro.services.js';
import { services as maoServices } from './mao.services.js';
import { services as maccoServices } from './macco.services.js';
import { services as mtoServices } from './mto.services.js';
import { services as meoServices } from './meo.services.js';
import { services as bplsServices } from './bpls.services.js';
import { services as hrmoServices } from './hrmo.services.js';
import { services as mboServices } from './mbo.services.js';
import { services as mpdoServices } from './mpdo.services.js';
import { services as magroServices } from './magro.services.js';
import { services as mhoServices } from './mho.services.js';
import { services as mgsoServices } from './mgso.services.js';
import { services as mdrrmoServices } from './mdrrmo.services.js';
import { services as seedoMarketServices } from './seedo-market.services.js';
import { services as seedoSlaughterServices } from './seedo-slaughter.services.js';
import { services as oscaServices } from './osca.services.js';
import { services as tourismServices } from './tourism.services.js';
import { services as mmoItServices } from './mmo-it.services.js';

export const services = [
  ...mmoServices,
  ...mswdoServices,
  ...mcroServices,
  ...maoServices,
  ...maccoServices,
  ...mtoServices,
  ...meoServices,
  ...bplsServices,
  ...hrmoServices,
  ...mboServices,
  ...mpdoServices,
  ...magroServices,
  ...mhoServices,
  ...mgsoServices,
  ...mdrrmoServices,
  ...seedoMarketServices,
  ...seedoSlaughterServices,
  ...oscaServices,
  ...tourismServices,
  ...mmoItServices,
];