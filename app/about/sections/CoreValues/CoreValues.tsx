'use client';

import { SectionTitle, ValueCard } from '@/app/components/common';

export default function CoreValues() {
    return (
        <section>
            <div className="container">
                <SectionTitle text="Core Values" gridSpaces={7} mobileGridSpaces={8} />
                <div className="values-grid">
                    <ValueCard
                        value="honesty"
                        title="Honesty"
                        description="Say what you mean, mean what you say"
                    />
                    <ValueCard
                        value="openCommunication"
                        title="Candor"
                        description="Say what you need, say what you feel"
                    />
                    <ValueCard
                        value="mutualRespect"
                        title="Mutual Respect"
                        description="Everyone brings something valuable"
                    />
                    <ValueCard
                        value="havingFun"
                        title="Having Fun"
                        description="Life's too short for boring work"
                    />
                    <ValueCard
                        value="growth"
                        title="Growth"
                        description="Comfort zones are where skills go to die"
                    />
                    <ValueCard
                        value="sanity"
                        title="Sanity"
                        description="Mental peace enables purposeful work"
                    />
                </div>
            </div>
        </section>
    );
}
