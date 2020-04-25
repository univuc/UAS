/**
 * This file is part of Univuc/UAS.
 *
 * Copyright (C) 2020 Univuc <potados99@gmail.com>
 *
 * Univuc/UAS is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * Univuc/UAS is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

import Injector from './Injector';
import logger from '../utils/logger';

const injector = new Injector();

let isInitialized = false;

export default function resolve(type) {
  logger.verbose(`Resolve '${type.name}'`);

  return injector.resolve(type);
}

export async function init(declaration, force = false, verbose = false) {
  if (!isInitialized || force) {
    await injector.init(declaration, verbose);

    logger.verbose('Injector initialized.');
    isInitialized = true;
  } else {
    logger.verbose('Ignore init.');
  }
}

export async function initWithOverrides(declaration, override, force = false, verbose = false) {
  const declarations = _toArrayIfNot(declaration);
  const overrides = _toArrayIfNot(override);

  const finalDeclaration = declarations.map((decl) => {
    const overrideFound = overrides.find((ov) => ov.as === decl.as);

    if (overrideFound) {
      return {
        create: overrideFound.create,
        as: overrideFound.as,
      };
    } else {
      return decl;
    }
  });

  await init(finalDeclaration, force, verbose);
}

function _toArrayIfNot(object) {
  if (Array.isArray(object)) {
    return object;
  } else {
    return [object];
  }
}

export function mockPersist(classType, instance) {
  injector.mock(classType, instance);
}

export function mockOnce(classType, instance) {
  injector.mockOnce(classType, instance);
}

export function mockClear(classType) {
  injector.mockClear(classType);
}
