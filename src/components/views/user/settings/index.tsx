import Development from "@/components/fragments/Development/User";
import Head from "next/head";

const SettingsView = () => {
  return (
    <div>
      <Head>
        <title>Settings</title>
        <meta name="description" content="Settings" />
      </Head>
      <Development />
    </div>
  );
};

export default SettingsView;
