import YAML from "js-yaml";

export function readVersion(contents) {
  return YAML.load(contents).spec.version;
}

export function writeVersion(contents, version) {
  const yaml = YAML.load(contents);
  yaml.spec.version = version;
  return YAML.dump(yaml);
}
