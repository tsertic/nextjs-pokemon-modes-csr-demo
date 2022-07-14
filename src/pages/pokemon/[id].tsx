import { useRouter } from "next/router";
import React from "react";
import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";
import styles from "./../../styles/Details.module.css";
interface IPokemonDetails {
  name: string;
  id: number;
  image: string;
  type: any;
  stats: {
    name: string;
    value: string;
  }[];
}
const Details = () => {
  const {
    query: { id },
  } = useRouter();
  const mainURL = "https://jherr-pokemon.s3.us-west-1.amazonaws.com";
  const [pokemon, setPokemon] = useState<IPokemonDetails | null>(null);

  useEffect(() => {
    async function getPokemon() {
      const resp = await fetch(`${mainURL}/pokemon/${id}.json`);
      setPokemon(await resp.json());
    }
    if (id) {
      getPokemon();
    }
  }, [id]);

  if (!pokemon) {
    return null;
  }

  return (
    <div>
      <Head>
        <title>{pokemon.name}</title>
      </Head>
      <div>
        <Link href="/">
          <a>Back to Home</a>
        </Link>
      </div>
      <div className={styles["layout"]}>
        <div>
          <img
            className={styles.picture}
            src={`${mainURL}/${pokemon.image}`}
            alt={pokemon.name}
          />
        </div>
        <div>
          <div className={styles["name"]}>{pokemon.name}</div>
          <div className={styles["type"]}>{pokemon.type.join(", ")}</div>
          <table>
            <thead className={styles["header"]}>
              <tr>Name</tr>
              <tr>Value</tr>
            </thead>
            <tbody>
              {pokemon.stats.map(({ name, value }) => {
                return (
                  <tr key={name}>
                    <td className={styles["attribute"]}>{name}</td>{" "}
                    <td>{value}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Details;
