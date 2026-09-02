import { useEffect } from "react";
import { Route, Switch, useLocation } from "wouter";
import ErrorBoundary from "@/components/ErrorBoundary";
import Layout from "@/components/Layout";
import { applyTheme, themeForPath } from "@/lib/themes";
import About from "@/pages/About";
import Contact from "@/pages/Contact";
import Home from "@/pages/Home";
import NotFound from "@/pages/NotFound";
import Projects from "@/pages/Projects";
import Services from "@/pages/Services";

function ThemeSync() {
  const [location] = useLocation();

  useEffect(() => {
    applyTheme(themeForPath(location));
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [location]);

  return null;
}

export default function App() {
  return (
    <ErrorBoundary>
      <ThemeSync />
      <Layout>
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/projects" component={Projects} />
          <Route path="/about" component={About} />
          <Route path="/services" component={Services} />
          <Route path="/contact" component={Contact} />
          <Route component={NotFound} />
        </Switch>
      </Layout>
    </ErrorBoundary>
  );
}
